import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const UserManager = () => {
    
    const [userList, setUserList] = useState([]);
    const getUserData = async () => {
        const res = await fetch('http://localhost:5000/user/getall');
        console.log(res.status);
        const data = await res.json();
        console.table(data);
        setUserList(data);
    }
        useEffect(() => {
          
            //when component opens
            getUserData();
         
        }, [])

        // request to delete
        const deleteUser = async (id) => {
            const res = await fetch('http://localhost:5000/user/delete/'+id,{
                method : 'DELETE'
            });
            console.log(res.status)
            if(res.status === 200){

                getUserData()
                toast.success("User Deleteed successfully");
            }
            
        
        }
        
  return (
    <div className= 'vh-100 bg-body-secondary'>
    <div className="container py-4">
        <h1 className='text-center'>User Manager</h1>

        <table className='table table-dark'>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th colSpan={2} className='text-center'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    userList.map((user, index) => (
                        <tr>
                            <td>{index+1}</td>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <Link to={"/updateuser/"+user._id} className='btn btn-primary'>update</Link>
                            </td>
                            <td>
                                <button onClick ={() => deleteUser(user._id)}
                                 className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>

                    ))
                }
            </tbody>
        </table>
    </div>
    </div>
  )
}

//hook lifecycle ke lie
//useeffect autosave ke lie 

export default UserManager;