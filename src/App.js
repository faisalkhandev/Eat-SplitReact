import React, { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showFriends, setShowFriends] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowFriends() {
    setShowFriends((show) => !show);
  }

  function handleAddFriends(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowFriends(false);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend(friend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} onSelection={handleSelectFriend} />

        {showFriends && <FormAddFriends onAddFriend={handleAddFriends} />}

        <Button onClick={handleShowFriends}>
          {showFriends ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendList({ friends, onSelection }) {
  return (
    <ul key={friends.id}>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onSelection={onSelection} />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h2>{friend.name}</h2>

      {friend.balance < 0 && (
        <p className="red">
          you own {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          you own {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>you both are even</p>}
      <Button onClick={() => onSelection(friend)}>Select</Button>
    </li>
  );
}

function FormAddFriends({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleAddFriend(e) {
    e.preventDefault();

    if (!name || !image) {
      alert("Bhai jan aap ne naam nahi likha. 😊");
      return;
    }

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage(image);
  }
  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>🧍‍♂️ Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📷 Image URL </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add Friend</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split the bill with {selectedFriend.name}</h2>

      <label>💰 Total Bill </label>
      <input type="text" />

      <label>👨‍💼 Your Expense </label>
      <input type="text" />

      <label>👫 {selectedFriend.name}'s Bill </label>
      <input type="text" disabled />

      <label> 🤑 Who's paying </label>
      <select name="" id="">
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
