import { useState, useEffect } from 'react';
import axios from 'axios';
import "./SectionPage.css";
import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  Input,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography
} from '@mui/material';

const SectionList = () => {
  const [sections, setSections] = useState([
    // { id: 1, title: 'Section 1' },
    // { id: 2, title: 'Section 2' },
    // { id: 3, title: 'Section 3' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [sectionName, setSectionName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data.map(user => user.name));
    };
    fetchUsers();
  }, []);

  const addSection = () => {
    setSections([...sections, { id: sections.length + 1, title: sectionName, user: selectedUser }]);
    setShowModal(false);
    setSectionName('');
    setSelectedUser('');
  };

  const saveSections = async () => {
    // Save the sections to your data store
    console.log(sections);
  };

  return (
    <div className='Section-list'>
      <Typography color={"black"} fontWeight={"bold"} variant="h1">Section List</Typography>
      <ul className='list' >
        {sections.map(section => (
          <ListItem  key={section.id} >
            <ListItemText  primary={`${section.title} - ${section.user}`} />
          </ListItem>
        ))}
      </ul>
      <Button variant="contained" onClick={() => setShowModal(true)}>Add Section</Button>
      <Button variant="contained" onClick={saveSections}>Save</Button>
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <Typography variant="h1">Add Section</Typography>
        <FormControl fullWidth>
          <InputLabel>Enter section name</InputLabel>
          <Input value={sectionName} onChange={e => setSectionName(e.target.value)} />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Select user</InputLabel>
          <Select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
            {users.map(user => (
              <MenuItem key={user} value={user}>
                {user}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={addSection}>Save</Button>
      </Dialog>
    </div>
  );
};

export default SectionList;
