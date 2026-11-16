import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, AppState, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { WebView } from 'react-native-webview'

const REVETA_URL = process.env.EXPO_PUBLIC_REVETA_URL ?? 'http://10.202.97.78:5174'

function freshUrl() {
  return `${REVETA_URL}/?boot=${Date.now()}`
}

export default function App() {
  const [failed, setFailed] = useState(false)
  const [uri, setUri] = useState(freshUrl)
  const last = useRef(AppState.currentState)

  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      if (next === 'background') last.current = 'background'
      if (next === 'active' && last.current === 'background') {
        last.current = 'active'
        setFailed(false)
        setUri(freshUrl())
      }
    })
    return () => sub.remove()
  }, [])

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <WebView
        key={uri}
        source={{ uri }}
        style={styles.web}
        originWhitelist={['*']}
        cacheEnabled={false}
        allowsBackForwardNavigationGestures
        contentInsetAdjustmentBehavior="never"
        onHttpError={() => setFailed(true)}
        onError={() => setFailed(true)}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator color="#ffffff" />
          </View>
        )}
      />
      {failed ? (
        <View style={styles.error}>
          <Text style={styles.errorTitle}>Can’t reach Reveta</Text>
          <Text style={styles.errorText}>
            Keep this computer awake, on the same Wi-Fi as the phone, and leave the preview running.
          </Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  web: { flex: 1, backgroundColor: '#000' },
  loading: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  error: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    backgroundColor: '#000',
  },
  errorTitle: { color: '#fff', fontSize: 22, fontWeight: '600', marginBottom: 8 },
  errorText: { color: '#9b9ba1', fontSize: 15, textAlign: 'center', lineHeight: 22 },
})
