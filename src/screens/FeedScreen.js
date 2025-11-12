// src/screens/FeedScreen.js
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig';

const FeedScreen = () => {
  const { logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Create a query to the 'posts' collection, ordered by timestamp
    const postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

    // 2. Set up a real-time listener (onSnapshot)
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsArray);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching posts:", error);
      setLoading(false);
    });

    // 3. Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Feed...</Text>
      </View>
    );
  }

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postHeader}>Post by User ID: {item.userId}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      {item.caption ? <Text style={styles.captionText}>{item.caption}</Text> : null}
      
      {item.timestamp && item.timestamp.seconds ? (
        <Text style={styles.timestampText}>
          {moment.unix(item.timestamp.seconds).fromNow()}
        </Text>
      ) : (
        <Text style={styles.timestampText}>Just now</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Framez Feed</Text>
        <Button title="Logout" onPress={logout} />
      </View>
      
      {posts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No posts yet. Go to the Create tab to share something!</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Light grey background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 40, // Adjust for status bar
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  postHeader: {
    padding: 10,
    fontWeight: '600',
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1, // Makes the image square
  },
  captionText: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  timestampText: {
    padding: 10,
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  }
});

export default FeedScreen;