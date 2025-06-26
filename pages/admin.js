import { useState } from 'react';
import { Box, Typography, Button, Paper, Alert, List, ListItem, ListItemText, Chip } from '@mui/material';

export default function AdminPage() {
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [allWinners, setAllWinners] = useState(null);
  const [allWinnersLoading, setAllWinnersLoading] = useState(false);

  const fetchWinner = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/winner');
      const data = await res.json();
      setWinner(data.winner ? data : null);
    } catch (e) {
      setError('فشل في جلب الفائز.');
    }
    setLoading(false);
  };

  const fetchAllWinners = async () => {
    setAllWinnersLoading(true);
    setError('');
    try {
      const res = await fetch('/api/all-winners');
      const data = await res.json();
      setAllWinners(data);
    } catch (e) {
      setError('فشل في جلب جميع الفائزين.');
    }
    setAllWinnersLoading(false);
  };

  const handleReset = async () => {
    if (!confirm('هل أنت متأكد من حذف جميع الإجابات؟')) {
      return;
    }
    setResetLoading(true);
    setResetMessage('');
    try {
      const res = await fetch('/api/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setResetMessage(data.message);
        setWinner(null);
        setAllWinners(null);
      } else {
        setResetMessage(data.error || 'فشل في الحذف');
      }
    } catch (e) {
      setResetMessage('فشل في الحذف');
    }
    setResetLoading(false);
  };

  return (
    <Box dir="rtl" display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#F9F5E1">
      <Paper elevation={3} sx={{ p: 4, minWidth: 400, maxWidth: 600 }}>
        <Typography variant="h5" mb={2}>لوحة الإدارة</Typography>
        
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" color="primary" onClick={fetchWinner} disabled={loading} sx={{ mr: 1, mb: 1 }}>
            {loading ? 'جاري التحميل...' : 'الفائز الأول'}
          </Button>
          <Button variant="contained" color="secondary" onClick={fetchAllWinners} disabled={allWinnersLoading} sx={{ mr: 1, mb: 1 }}>
            {allWinnersLoading ? 'جاري التحميل...' : 'جميع الفائزين'}
          </Button>
          <Button variant="contained" color="error" onClick={handleReset} disabled={resetLoading} sx={{ mb: 1 }}>
            {resetLoading ? 'جاري الحذف...' : 'حذف جميع الإجابات'}
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {resetMessage && <Alert severity={resetMessage.includes('نجح') ? 'success' : 'error'} sx={{ mb: 2 }}>{resetMessage}</Alert>}

        {/* First Winner Section */}
        {winner && (
          <Box sx={{ mb: 3, p: 2, border: '2px solid #4caf50', borderRadius: 1, bgcolor: '#f1f8e9' }}>
            <Typography variant="h6" color="primary" mb={1}>🏆 الفائز الأول</Typography>
            <Typography>رقم الهاتف: <b>{winner.winner}</b></Typography>
            <Typography>الوقت: {new Date(winner.timestamp).toLocaleString('ar-EG')}</Typography>
          </Box>
        )}

        {/* All Winners Section */}
        {allWinners && (
          <Box>
            <Typography variant="h6" mb={2}>
              جميع الفائزين ({allWinners.winners.length})
            </Typography>
            {allWinners.winners.length === 0 ? (
              <Typography>لا يوجد فائزين حتى الآن.</Typography>
            ) : (
              <List>
                {allWinners.winners.map((w, index) => (
                  <ListItem key={w.timestamp} sx={{ 
                    border: index === 0 ? '2px solid #4caf50' : '1px solid #ddd',
                    borderRadius: 1,
                    mb: 1,
                    bgcolor: index === 0 ? '#f1f8e9' : 'white'
                  }}>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center">
                          <Typography variant="body1">
                            {index + 1}. {w.phone}
                          </Typography>
                          {index === 0 && (
                            <Chip label="الفائز الأول" color="success" size="small" sx={{ mr: 1 }} />
                          )}
                        </Box>
                      }
                      secondary={w.date}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}

        {!winner && !allWinners && (
          <Typography>اضغط على أحد الأزرار أعلاه لعرض النتائج.</Typography>
        )}
      </Paper>
    </Box>
  );
} 