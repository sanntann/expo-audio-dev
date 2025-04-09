import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

const trackUrls = [
  'https://software-mansion.github.io/react-native-audio-api/audio/music/example-music-02.mp3',
  'https://software-mansion.github.io/react-native-audio-api/audio/music/example-music-03.mp3',
];

function TrackPlayer({ name, uri }: { name: string; uri: string }) {
  const player = useAudioPlayer(uri);
  const status = useAudioPlayerStatus(player);
  return (
    <View style={styles.audioTrackContainer}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{status.playbackState}</Text>
      <Text style={styles.text}>{status.currentTime.toFixed(1)}s</Text>
      <Button
        title={status.playing ? 'Pause' : 'Play'}
        onPress={() => (status.playing ? player.pause() : player.play())}
      />
    </View>
  );
}

export default function AudioScreen() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Concurrent audio test</Text>
        {trackUrls.map((url, index) => (
          <TrackPlayer key={url} name={`Track ${index + 1}`} uri={url} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  audioTrackContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
});
