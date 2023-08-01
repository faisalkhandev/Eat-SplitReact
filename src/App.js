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
  const [showFriends, setShowFriends] = useState(false);

  function handleShowFriends() {
    setShowFriends((show) => !show);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        {showFriends && <FormAddFriends />}
        <Button onClick={handleShowFriends}>
          {showFriends ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;

  return (
    <ul key={friends.id}>
      {friends.map((friend) => (
        <Friend friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li key={friend.id}>
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
      {friend.balance === 0 && (
        <p>
          you own {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriends() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleAddFriend(e) {
    e.preventDefault();

    const newFriend = {
      id: crypto.randomUUID(),
      name,
      balance: 0,
      image,
    };

    console.log(newFriend);
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
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split the bill with X</h2>

      <label>💰 Total Bill </label>
      <input type="text" />

      <label>👨‍💼 Your Expense </label>
      <input type="text" />

      <label>👫 X's Bill </label>
      <input type="text" disabled />

      <label> 🤑 Who's paying </label>
      <select name="" id="">
        <option value="you">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
