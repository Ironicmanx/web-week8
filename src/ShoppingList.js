
// ShoppingList.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from './firebase'; // Adjust the path as necessary to import your firebase file
import { collection, onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore"; // Import Firestore methods

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [itemInput, setItemInput] = useState('');

  // Fetch items from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'shoppingList'), (snapshot) => {
      const itemList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemList);
    });

    return () => unsubscribe();
  }, []);

  // Add item to Firestore
  const addItem = async () => {
    if(!itemInput) return; // Don't add empty items
    if (itemInput) {
      await addDoc(collection(db, 'shoppingList'), { name: itemInput });
      setItemInput(''); // Clear input after adding
    }
  };

  // Remove item from Firestore
  const removeItem = async (id) => {
    await deleteDoc(doc(db, 'shoppingList', id));
  };
return (
    <View style={styles.container}>
        <Text style={styles.title}>Shopping List</Text>
        <TextInput
            style={styles.input}
            value={itemInput}
            onChangeText={setItemInput}
            placeholder="Add new item"
        />
        <View style={styles.buttonContainer}>
            <Button title="Add Item" onPress={addItem} style={styles.button} />
        </View>
        <FlatList
            data={items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                        <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    </View>
);
};

export default ShoppingList;

const styles = StyleSheet.create({
    container: {
        marginTop: 180,
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20, 
        padding: 10,
    },
    buttonContainer: {
        marginBottom: 30, 
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemText: {
        fontSize: 18,
    },
    removeButton: {
        color: 'red',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
