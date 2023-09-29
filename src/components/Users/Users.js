import { useState, useEffect } from 'react';
import './Users.scss';
import { UsersList } from './UsersList';
import { Success } from './Success';

function Users() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then(json => setUsers(json.data))
    .catch(err => console.log(`Произошла ошибка: ${err.message}`))
    .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearchValue = (evt) => {
    setSearchValue(evt.target.value);
  };

  const onClickInvite = (id) => {
    invites.includes(id)
     ? setInvites(prev => prev.filter(_id => _id !== id))
     : setInvites(prev => [...prev, id])
  };

  const onClickSendInvites = () => {
    setSuccess(true);
  }

  return (
    <div className="Users">
        {
            success
             ? <Success count={invites.length} />
             : (
                <UsersList 
                    items={users} 
                    isLoading={isLoading} 
                    searchValue={searchValue} 
                    onChangeSearchValue={onChangeSearchValue}
                    invites={invites}
                    onClickInvite={onClickInvite}
                    onClickSendInvites={onClickSendInvites}
                />
             )    
        }
    </div>
  );
}

export default Users;