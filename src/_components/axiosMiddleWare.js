import axios from "axios"

axios.defaults.baseURL = 'http://localhost:8000/api';
const User = localStorage.getItem("User")
if (User) { 
    const ParsedUser = JSON.parse(User)
    axios.defaults.headers.common['Authorization'] = ParsedUser.token
}
