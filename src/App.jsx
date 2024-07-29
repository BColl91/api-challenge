import './App.css';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

const App = () => {
  const [allData, setAllData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/equipment");

      if (!response.ok) {
        throw new Error("Something has not worked out");
      }

      const dataData = await response.json();
      setAllData(dataData.data.slice(10, 30));
      setErrorMsg("");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (item) => {
    console.log(item); // Log the selected item
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <h1>Fetching Hyrule Equipment API</h1>

      {errorMsg && <p>{errorMsg}</p>}

      <div className="items-grid">
        {allData.map((data, index) => (
          <div key={index} className="item-card" onClick={() => openModal(data)}>
            <h3>{data.name}</h3>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        ariaHideApp={false} 
        contentLabel="Item Details"
        style={{overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' }}}
      >
        {selectedItem && (
          <div style={{ textAlign: 'center' }}>
            <h2>{selectedItem.name}</h2>
            {selectedItem.image && <img src={selectedItem.image} alt={selectedItem.name} className="modal-image" style={{ maxWidth: '100%', maxHeight: '300px', display: 'block', margin: '20px auto' }} />}
            <p>{selectedItem.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default App;
