import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  IconButton,
  Divider,
} from '@mui/material';
import {
  AccountBalance,
  Add,
  AttachMoney,
  Schedule,
  CheckCircle,
  Payment,
  Close,
  Check,
  Cancel,
  Delete,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MY_LOANS, GET_ALL_LOANS, REQUEST_LOAN, REGISTER_REPAYMENT, UPDATE_LOAN_STATUS, DELETE_LOAN } from '../../apollo/queries';
import { useAuth } from '../../contexts/AuthContext';

// PropTypes para validar las propiedades de LoanCard y sus campos internos.
import PropTypes from 'prop-types';

const getLoanStatusColor = (status) => {
  // Devuelve el color apropiado para el chip según el estado del préstamo.
  if (status === 'approved') return 'success';
  if (status === 'pending') return 'warning';
  if (status === 'rejected') return 'error';
  return 'default';
};

const LoanCard = ({ loan, onMakePayment, showUserInfo, onApprove, onReject, onDelete, isAdmin }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <Card sx={{ height: '100%' }}>
        <CardContent>
          {showUserInfo && loan.user && (
            <Box sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="caption" color="text.secondary">
                Solicitante:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {loan.user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {loan.user.email}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                ${loan.amount.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {loan.purpose}
              </Typography>
            </Box>
            <Chip
              label={loan.status}
              color={getLoanStatusColor(loan.status)}
              size="small"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Detalles del préstamo
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption">Plazo:</Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {loan.termMonths} meses
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption">Tasa de interés:</Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {loan.interestRate}% mensual
              </Typography>
            </Box>
            {loan.monthlyPayment && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption">Cuota mensual:</Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  ${loan.monthlyPayment.toLocaleString()}
                </Typography>
              </Box>
            )}
            {loan.remainingAmount && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption">Saldo pendiente:</Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  ${loan.remainingAmount.toLocaleString()}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Botones para admin cuando el préstamo está pendiente */}
          {isAdmin && loan.status === 'pending' && (
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                startIcon={<Check />}
                onClick={() => onApprove(loan)}
              >
                Aprobar
              </Button>
              <Button
                variant="contained"
                color="error"
                fullWidth
                startIcon={<Cancel />}
                onClick={() => onReject(loan)}
              >
                Rechazar
              </Button>
            </Box>
          )}

          {/* Botón de pago para usuarios normales */}
          {!isAdmin && loan.status === 'approved' && (
            <Button
              variant="contained"
              fullWidth
              startIcon={<Payment />}
              onClick={() => onMakePayment(loan)}
              sx={{ mt: 2 }}
            >
              Realizar Pago
            </Button>
          )}

          {loan.status === 'rejected' && (
            <>
              {loan.rejectionReason && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Motivo de rechazo:</strong> {loan.rejectionReason}
                  </Typography>
                </Alert>
              )}
              {!isAdmin && onDelete && (
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<Delete />}
                  onClick={() => onDelete(loan)}
                  sx={{ mt: 2 }}
                >
                  Eliminar Préstamo
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Validación de propiedades para LoanCard. Definimos la forma del objeto préstamo
// y aseguramos que la función onMakePayment siempre esté presente.
LoanCard.propTypes = {
  loan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    purpose: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    termMonths: PropTypes.number.isRequired,
    interestRate: PropTypes.number.isRequired,
    monthlyPayment: PropTypes.number,
    remainingAmount: PropTypes.number,
    rejectionReason: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
  onMakePayment: PropTypes.func.isRequired,
  showUserInfo: PropTypes.bool,
  onApprove: PropTypes.func,
  onReject: PropTypes.func,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
};

const Loans = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const [loanForm, setLoanForm] = useState({
    amount: '',
    purpose: '',
    termMonths: 12,
  });

  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    paymentMethod: 'efectivo',
    reference: '',
    notes: '',
  });

  // Admin ve todos los préstamos, usuarios normales solo los suyos
  const { data: loansData, loading: loansLoading, error: loansError } = useQuery(
    isAdmin ? GET_ALL_LOANS : GET_MY_LOANS
  );

  // Log de errores
  if (loansError) {
    console.error('❌ Error al cargar préstamos:', loansError);
  }
  
  const [requestLoan] = useMutation(REQUEST_LOAN, {
    refetchQueries: [{ query: isAdmin ? GET_ALL_LOANS : GET_MY_LOANS }],
  });
  const [registerRepayment] = useMutation(REGISTER_REPAYMENT, {
    refetchQueries: [{ query: isAdmin ? GET_ALL_LOANS : GET_MY_LOANS }],
  });
  const [updateLoanStatus] = useMutation(UPDATE_LOAN_STATUS, {
    refetchQueries: [{ query: isAdmin ? GET_ALL_LOANS : GET_MY_LOANS }],
  });
  const [deleteLoan] = useMutation(DELETE_LOAN, {
    refetchQueries: [{ query: isAdmin ? GET_ALL_LOANS : GET_MY_LOANS }],
  });

  const loans = isAdmin ? (loansData?.allLoans || []) : (loansData?.myLoans || []);

  // Debug logs
  console.log('🔍 Debug Loans:', {
    isAdmin,
    loansData,
    loans,
    loading: loansLoading
  });

  const handleRequestLoan = async () => {
    try {
      await requestLoan({
        variables: {
          amount: parseFloat(loanForm.amount),
          purpose: loanForm.purpose,
          termMonths: loanForm.termMonths,
        },
      });
      setRequestDialogOpen(false);
      setLoanForm({ amount: '', purpose: '', termMonths: 12 });
      setActiveStep(0);
    } catch (error) {
      console.error('Error al solicitar préstamo:', error);
    }
  };

  const handleMakePayment = async () => {
    try {
      await registerRepayment({
        variables: {
          loanId: selectedLoan.id,
          amount: parseFloat(paymentForm.amount),
          paymentMethod: paymentForm.paymentMethod,
          reference: paymentForm.reference,
          notes: paymentForm.notes,
        },
      });
      setPaymentDialogOpen(false);
      setSelectedLoan(null);
      setPaymentForm({ amount: '', paymentMethod: 'efectivo', reference: '', notes: '' });
    } catch (error) {
      console.error('Error al registrar pago:', error);
    }
  };

  const openPaymentDialog = (loan) => {
    setSelectedLoan(loan);
    setPaymentForm({
      amount: loan.monthlyPayment?.toString() || '',
      paymentMethod: 'efectivo',
      reference: '',
      notes: '',
    });
    setPaymentDialogOpen(true);
  };

  const handleApproveLoan = async (loan) => {
    const userName = loan.user?.name || 'el usuario';
    if (window.confirm(`¿Aprobar préstamo de $${loan.amount.toLocaleString()} para ${userName}?`)) {
      try {
        await updateLoanStatus({
          variables: {
            loanId: loan.id,
            status: 'approved',
          },
        });
      } catch (error) {
        console.error('Error al aprobar préstamo:', error);
        alert('Error al aprobar el préstamo');
      }
    }
  };

  const handleRejectLoan = async (loan) => {
    const userName = loan.user?.name || 'el usuario';
    const reason = prompt(`Motivo del rechazo del préstamo de $${loan.amount.toLocaleString()} para ${userName}:`);
    if (reason) {
      try {
        await updateLoanStatus({
          variables: {
            loanId: loan.id,
            status: 'rejected',
            rejectionReason: reason,
          },
        });
      } catch (error) {
        console.error('Error al rechazar préstamo:', error);
        alert('Error al rechazar el préstamo');
      }
    }
  };

  const handleDeleteLoan = async (loan) => {
    if (window.confirm(`¿Eliminar préstamo rechazado de $${loan.amount.toLocaleString()}?`)) {
      try {
        await deleteLoan({
          variables: {
            loanId: loan.id,
          },
        });
      } catch (error) {
        console.error('Error al eliminar préstamo:', error);
        alert('Error al eliminar el préstamo');
      }
    }
  };

  // Estadísticas
  const totalLoans = loans.length;
  const approvedLoans = loans.filter(l => l.status === 'approved').length;
  const pendingLoans = loans.filter(l => l.status === 'pending').length;
  const totalAmount = loans
    .filter(l => l.status === 'approved')
    .reduce((sum, loan) => sum + loan.amount, 0);

  const steps = ['Información del préstamo', 'Revisar solicitud', 'Confirmar'];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                💰 {isAdmin ? 'Gestión de Microcréditos' : 'Centro de Microcréditos'}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                {isAdmin 
                  ? 'Administra y aprueba solicitudes de préstamos' 
                  : 'Accede a financiación para impulsar tu emprendimiento'}
              </Typography>
            </Box>
            {!isAdmin && (
              <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                onClick={() => setRequestDialogOpen(true)}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  },
                }}
              >
                Solicitar Préstamo
              </Button>
            )}
          </Box>
        </Paper>
      </motion.div>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <AccountBalance sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {totalLoans}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Préstamos Totales
              </Typography>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {approvedLoans}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Préstamos Aprobados
              </Typography>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Schedule sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {pendingLoans}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                En Revisión
              </Typography>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <AttachMoney sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                ${totalAmount.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Financiado
              </Typography>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Lista de préstamos */}
      {loansError ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          <Typography variant="body1">
            Error al cargar préstamos: {loansError.message}
          </Typography>
        </Alert>
      ) : loansLoading ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="body1">
            Cargando préstamos...
          </Typography>
        </Box>
      ) : loans.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
            }}
          >
            <AccountBalance sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              {isAdmin ? 'No hay préstamos registrados' : 'Aún no has solicitado préstamos'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {isAdmin 
                ? 'Los préstamos solicitados por las beneficiarias aparecerán aquí' 
                : 'Solicita tu primer microcrédito para impulsar tu emprendimiento'}
            </Typography>
            {!isAdmin && (
              <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                onClick={() => setRequestDialogOpen(true)}
              >
                Solicitar Préstamo
              </Button>
            )}
          </Card>
        </motion.div>
      ) : (
        <Grid container spacing={3}>
          {loans.map((loan, index) => (
            <Grid item xs={12} sm={6} md={4} key={loan.id}>
              <LoanCard
                loan={loan}
                onMakePayment={openPaymentDialog}
                showUserInfo={isAdmin}
                onApprove={handleApproveLoan}
                onReject={handleRejectLoan}
                onDelete={handleDeleteLoan}
                isAdmin={isAdmin}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog para solicitar préstamo */}
      <Dialog
        open={requestDialogOpen}
        onClose={() => setRequestDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Solicitar Microcrédito
            <IconButton onClick={() => setRequestDialogOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Monto solicitado (COP)"
                  type="number"
                  value={loanForm.amount}
                  onChange={(e) => setLoanForm({ ...loanForm, amount: e.target.value })}
                  helperText="Mínimo: $100,000 - Máximo: $5,000,000"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Propósito del préstamo"
                  multiline
                  rows={3}
                  value={loanForm.purpose}
                  onChange={(e) => setLoanForm({ ...loanForm, purpose: e.target.value })}
                  placeholder="Describe para qué utilizarás el préstamo..."
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Plazo de pago</InputLabel>
                  <Select
                    value={loanForm.termMonths}
                    onChange={(e) => setLoanForm({ ...loanForm, termMonths: e.target.value })}
                    label="Plazo de pago"
                  >
                    <MenuItem value={6}>6 meses</MenuItem>
                    <MenuItem value={12}>12 meses</MenuItem>
                    <MenuItem value={18}>18 meses</MenuItem>
                    <MenuItem value={24}>24 meses</MenuItem>
                    <MenuItem value={36}>36 meses</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && (
            <Box>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  Revisa los detalles de tu solicitud antes de confirmar
                </Typography>
              </Alert>
              
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Resumen de la solicitud</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Monto:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ${parseFloat(loanForm.amount || 0).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Plazo:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {loanForm.termMonths} meses
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Tasa de interés:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    2.5% mensual
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Cuota mensual estimada:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    ${Math.round((parseFloat(loanForm.amount || 0) * 1.025 ** loanForm.termMonths) / loanForm.termMonths).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Propósito:
                  </Typography>
                  <Typography variant="body2">
                    {loanForm.purpose}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          )}

          {activeStep === 2 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                ¿Confirmar solicitud de préstamo?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tu solicitud será revisada por nuestro equipo y recibirás una respuesta en 24-48 horas.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequestDialogOpen(false)}>
            Cancelar
          </Button>
          {activeStep > 0 && (
            <Button onClick={() => setActiveStep(activeStep - 1)}>
              Anterior
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={() => setActiveStep(activeStep + 1)}
              disabled={!loanForm.amount || !loanForm.purpose}
            >
              Siguiente
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleRequestLoan}
            >
              Confirmar Solicitud
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Dialog para realizar pago */}
      <Dialog
        open={paymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Realizar Pago
            <IconButton onClick={() => setPaymentDialogOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedLoan && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Préstamo: ${selectedLoan.amount.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Saldo pendiente: ${selectedLoan.remainingAmount?.toLocaleString() || selectedLoan.totalAmount?.toLocaleString()}
              </Typography>
            </Box>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Monto del pago (COP)"
                type="number"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Método de pago</InputLabel>
                <Select
                  value={paymentForm.paymentMethod}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                  label="Método de pago"
                >
                  <MenuItem value="efectivo">Efectivo</MenuItem>
                  <MenuItem value="transferencia">Transferencia bancaria</MenuItem>
                  <MenuItem value="tarjeta">Tarjeta de crédito/débito</MenuItem>
                  <MenuItem value="otro">Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Referencia/Número de transacción"
                value={paymentForm.reference}
                onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })}
                placeholder="Opcional"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notas adicionales"
                multiline
                rows={2}
                value={paymentForm.notes}
                onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                placeholder="Información adicional sobre el pago..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleMakePayment}
            disabled={!paymentForm.amount}
          >
            Registrar Pago
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Loans;

