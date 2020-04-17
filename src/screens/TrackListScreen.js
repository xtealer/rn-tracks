import React, { useContext } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { Context as TrackContext } from '../context/TrackContext';
import Loading from '../components/Loading';
import useLoading from '../hooks/useLoading';

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);
  const [loading, doTask] = useLoading(fetchTracks);

  if (!state.length) {
    doTask();
  }

  return (
    <>
      <NavigationEvents onWillFocus={doTask} />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={state}
          keyExtractor={track => track._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TrackDetail', {
                    _id: item._id
                  })
                }
              >
                <ListItem chevron title={item.name} />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </>
  );
};

TrackListScreen.navigationOptions = {
  title: 'Tracks'
};

const styles = StyleSheet.create({});

export default TrackListScreen;
