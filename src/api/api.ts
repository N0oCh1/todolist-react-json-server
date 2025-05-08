const _URL = 'https://todolist-n2ka.onrender.com/';
const _DEVELOPMENT_URL = 'http://localhost:3000/';

async function getTasks(code:string, username:string) {
  
  try{
    const response = await fetch(_DEVELOPMENT_URL+`users/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json());
    if(response.message === "create") {
      console.log("create");
      return login(username, code);
    }
    return getUserTask(code);
  } catch (error) {
    console.error("Error fetching tasks:", error); 
    throw error;
  }


  async function login (username:string, code:string) {
    try {
      const response = await fetch(_DEVELOPMENT_URL+`login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: username, code:code }),
      });
      return response.json();
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }


  async function getUserTask(code:string) {
    try{
      const response = await fetch(_DEVELOPMENT_URL+`tasks/${code}`, {
        method: "GET",
      }).then((res)=>res.json());
      return response.json();
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      throw error;
    }
  }
}
export { getTasks };