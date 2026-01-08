import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [apiMessage, setApiMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  // TODO: AWS APIのエンドポイントを設定
  const API_URL = import.meta.env.VITE_API_URL || null

  const callApi = async () => {
    if (!API_URL) {
      setApiMessage('API URLが設定されていません')
      return
    }
    setLoading(true)
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setApiMessage(JSON.stringify(data, null, 2))
    } catch (error) {
      setApiMessage(`エラー: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>mamamaeda's App</h1>
      <p className="subtitle">GitHub Pages + AWS API 連携プロジェクト</p>

      <div className="card">
        <h2>API 接続テスト</h2>
        <button onClick={callApi} disabled={loading}>
          {loading ? '通信中...' : 'AWS API を呼び出す'}
        </button>
        {apiMessage && (
          <pre className="api-response">{apiMessage}</pre>
        )}
        {!API_URL && (
          <p className="hint">
            💡 .env に VITE_API_URL を設定してください
          </p>
        )}
      </div>

      <div className="status">
        <p>✅ React アプリ動作中</p>
        <p>{API_URL ? '✅' : '⏳'} AWS API {API_URL ? '設定済み' : '未設定'}</p>
      </div>
    </div>
  )
}

export default App
