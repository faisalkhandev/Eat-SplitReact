import React, { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Mark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Elon",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Bill",
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
    // setSelectedFriend(friend);

    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowFriends(false);
  }

  function handleSplitBill(value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }

  return (
    <div>
      <h3 id="heading">Eat and Split Bill 😋</h3>
      <div className="app">
        <div className="sidebar">
          <FriendList
            friends={friends}
            onSelection={handleSelectFriend}
            selectedFriend={selectedFriend}
          />

          {showFriends && <FormAddFriends onAddFriend={handleAddFriends} />}

          <Button onClick={handleShowFriends}>
            {showFriends ? "Close" : "Add Friend"}
          </Button>
        </div>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </div>
  );
}

function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <ul key={friends.id}>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend === friend;

  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "close" : "select"}
      </Button>
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByYou, setPaidByYou] = useState("");
  const paidByFriend = bill ? bill - paidByYou : "";
  const [whoIsPaying, setWhoIsPaying] = useState("you");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByYou) return;
    onSplitBill(whoIsPaying === "you" ? paidByFriend : -paidByYou);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split the bill with {selectedFriend.name}</h2>

      <label>💰 Total Bill </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>👨‍💼 Your Expense </label>
      <input
        type="text"
        value={paidByYou}
        onChange={(e) =>
          setPaidByYou(
            Number(e.target.value) > bill ? paidByYou : Number(e.target.value)
          )
        }
      />

      <label>👫 {selectedFriend.name}'s Expense </label>
      <input type="text" disabled value={paidByFriend} />

      <label> 🤑 Who's Paying </label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
