import './App.css';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

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
      setAllData(dataData.data.slice(0, 50));
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

      <h3>This is a completed task coded by BCollins</h3>

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
        className= "modal"
        overlayClassName="modalBg"
      >
        {selectedItem && (
          <div>
            <h2>{selectedItem.name}</h2>
            {selectedItem.image && <img src={selectedItem.image} alt={selectedItem.name} className="modal-image"/>}
            <p>{selectedItem.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default App;
