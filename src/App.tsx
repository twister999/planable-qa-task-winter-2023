import React, { useState } from 'react';

type GroceryItem = {
  id: number;
  name: string;
  completed: boolean;
  quantity: number;
  unit: 'units' | 'pounds' | 'cups';
};


function App() {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedUnit, setSelectedUnit] = useState<'units' | 'pounds' | 'cups'>('units');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
const [selectedItem, setSelectedItem] = useState<GroceryItem | null>(null);

const openModal = (item: GroceryItem) => {
  setSelectedItem(item);
  setIsModalOpen(true);
};

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const clickOutside = () => {
  setIsModalOpen(false);
  setGroceryList(
    groceryList.map((item) => (item.id === selectedItem?.id ? {...selectedItem, completed:true } : item))
  );
  setSelectedItem(null);
};
const closeModal = () => {
  setIsModalOpen(false);
  setSelectedItem(null);
};

const updateItem = (updatedItem: GroceryItem) => {
  setGroceryList(
    groceryList.map((item) => (item.id === updatedItem.id ? updatedItem : item))
  );
  closeModal();
};


  const deleteItem = (itemName: string) => {
    setGroceryList(groceryList.filter((item) => item.name !== itemName));
  };

  const addItem = () => {
      setGroceryList([
        ...groceryList,
        {
          id: Date.now(),
          name: capitalizeFirstLetter(newItem).trim(),
          completed: false,
          quantity: quantity,
          unit: selectedUnit,
        },
      ]);
      setNewItem('');
      setQuantity(1);

  };
  
  
  
  
  const toggleCompleted = (itemId: number) => {
    setGroceryList(
      groceryList.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };
  

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      addItem();
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isModalOpen && selectedItem && (
  <div
    className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
    onClick={clickOutside}
  >
    <div
      className="bg-white p-6 rounded shadow-lg max-w-md w-full mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-xl mb-4">Edit Item</h3>
      <input
        type="text"
        value={selectedItem.name}
        onChange={(e) =>
          setSelectedItem({ ...selectedItem, name: e.target.value })
        }
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />
      <input
        type="number"
        value={selectedItem.quantity}
        onChange={(e) =>
          setSelectedItem({
            ...selectedItem,
            quantity: parseInt(e.target.value),
          })
        }
        className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
      />
      <select
        value={selectedItem.unit}
        onChange={(e) =>
          setSelectedItem({
            ...selectedItem,
            unit: e.target.value as 'units' | 'pounds' | 'cups',
          })
        }
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
      >
        <option value="units">units</option>
        <option value="cups">cups</option>
      </select>
      <button
        disabled={!selectedItem.name}
        onClick={() => updateItem(selectedItem)}
        className={"hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline" + (selectedItem.name ? " bg-blue-500" : " bg-gray-500")}
      >
        Save
      </button>
    </div>
  </div>
)}

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-6">Grocery List</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={handleKeyPress}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
            placeholder="Add an item..."
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            min="1"
            className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
            placeholder="Qty"
          />
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value as 'units' | 'pounds' | 'cups')}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
          >
            <option value="units">units</option>
            <option value="pounds">pounds</option>
            <option value="cups">cups</option>
          </select>
          <button
            onClick={addItem}
            className={"text-white font-bold py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline" + (newItem ? " bg-blue-500 hover:bg-blue-700 " : " bg-gray-500")}
          >
            Add
          </button>
        </div>
        <ul className="list-none space-y-2">
  {groceryList.map((item) => (
    <li
      key={item.id}
      className="cursor-pointer flex items-center justify-between p-3 bg-white shadow rounded"
      onClick={() => toggleCompleted(item.id)}
    >
      <div className="flex items-center">
        <span
          className={`text-gray-700 text-lg font-semibold ${
            item.completed ? 'line-through' : ''
          }`}
        >
          {item.name}
        </span>
        <span className="text-gray-500 text-sm ml-4">
          {item.quantity} {item.unit}
        </span>
      </div>
      {!item.completed && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      openModal({...item, unit: 'units'});
    }}
    className="text-gray-500 ml-4"
  >
    <svg width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g id="Complete">
        <g id="edit">
          <g>
          <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          </g>
        </g>
      </g>
    </svg>

  </button>
)}
      {item.completed && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteItem(item.name);
          }}
          className="text-red-500 font-bold text-xl"
        >
          X
        </button>
      )}
    </li>
  ))}
</ul>


      </div>
    </div>
  );
}

export default App;
