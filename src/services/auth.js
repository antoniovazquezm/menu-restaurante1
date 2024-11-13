import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore'; // Añadido getFirestore
import { app } from "./firebaseConfig"; // Importamos app en lugar de db

// Inicializamos auth y db
const auth = getAuth(app);
const db = getFirestore(app);

// Register
const registerUser = async (email, password, name) => {
    try {
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userDocRef = doc(db, "Users", userCredential.user.uid);
        await setDoc(userDocRef, {
            name: name,
            email: email,
            createdAt: new Date().toISOString() // Convierte a string para mejor compatibilidad
        });
        
        console.log("User registered successfully:", userCredential.user.uid);
        return { user: userCredential.user, error: null };
    } catch (error) {
        console.error("Error registering user:", error.message);
        let errorMessage = error.message;
        
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Este correo electrónico ya está registrado';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'La contraseña necesita por lo menos 6 carcteres';
        }
        
        return { user: null, error: errorMessage };
    }
}

// Login
const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(getAuth(app), email, password);
        const userDocRef = doc(db, "Users", userCredential.user.uid);  
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const isAdmin = userData.role === 'admin';  // Verificar si es admin o no
            console.log("User logged in successfully:", userCredential.user.uid, "Role:", userData.role);
            
            // Retornamos los datos del usuario junto con su rol
            return { user: userCredential.user, userData, isAdmin, error: null };
        } else {
            console.error("User document not found");
            return { user: null, error: "Error al cargar los datos del usuario" };
        }
    } catch (error) {
        console.error("Error logging in:", error.message);
        let errorMessage = error.message;
        
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'Usuario no encontrado';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Contraseña incorrecta';
        }
        
        return { user: null, error: errorMessage };
    }
}

// Logout
const logoutUser = async () => {
    try {
        await signOut(auth);
        console.log("User logged out successfully");
        return { error: null };
    } catch (error) {
        console.error("Error logging out:", error.message);
        return { error: "Error al cerrar sesión" };
    }
}

export { registerUser, loginUser, logoutUser };