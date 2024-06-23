import axios from 'axios';
import { createContext,useState,useEffect } from 'react';

export const UserContext  = createContext({});

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);
    // useEffect(()=>{
    //     if(!user) {
    //         axios.get('/profile').then(({data})=>{
    //             setUser(data)
    //         })
    //     }
    // },[])


    useEffect(() => {
        fetchUserProfile(); // Fetch user profile on component mount
    }, []);

    const fetchUserProfile = async () => {
        try {
            const { data } = await axios.get('/profile');
            setUser(data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    // Method to update user context after login
    const updateUserContext = (userData) => {
        setUser(userData);
    };
    return (
        <UserContext.Provider value={{user,setUser,updateUserContext}}>
            {children}
        </UserContext.Provider>
    )
}