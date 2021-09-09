import React, {
    createContext,
    ReactNode,
    useContext,
    useState
} from "react";

import * as Google from 'expo-google-app-auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
    children: ReactNode
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>({} as User);

    async function signInWithGoogle() {
        try {
            const result = await Google.logInAsync({
                iosClientId: '365150139948-q4vpbvjb2t44i1d9e370390d35ss22ib.apps.googleusercontent.com',
                androidClientId: '365150139948-e7ibtqj9pgmv2v6sjrcop22p0uptgoh8.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });

            if (result.type === 'success') {
                const userLogged = {
                    id: String(result.user.id),
                    email: result.user.email!,
                    name: result.user.name!,
                    photo: result.user.photoUrl!
                };

                setUser(userLogged);

                await AsyncStorage.setItem('@appfinancas:user', JSON.stringify(userLogged));
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }