import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  IconButton,
} from '@mui/material';
import {
  AccountBalance,
  Add,
  AttachMoney,
  Schedule,
  CheckCircle,
  Cancel,
  TrendingUp,
  Payment,
  Receipt,
  Close,
  Info,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MY_LOANS, REQUEST_LOAN, REGISTER_REPAYMENT } from '../../apollo/queries';

const LoanCard = ({ loan, onMakePayment }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -2 }}
  >
    <Card sx={{ height: '100%' }}>
      <CardContent>
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
            color={
              loan.status === 'approved' ? 'success' :
              loan.status === 'pending' ? 'warning' :
              loan.status === 'rejected' ? 'error' : 'default'
            }
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

        {loan.status === 'approved' && (
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

        {loan.status === 'rejected' && loan.rejectionReason && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Motivo de rechazo:</strong> {loan.rejectionReason}
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const Loans = () => {
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

  const { data: loansData, loading: loansLoading } = useQuery(GET_MY_LOANS);
  const [requestLoan] = useMutation(REQUEST_LOAN, {
    refetchQueries: [GET_MY_LOANS],
  });
  const [registerRepayment] = useMutation(REGISTER_REPAYMENT, {
    refetchQueries: [GET_MY_LOANS],
  });

  const loans = loansData?.myLoans || [];

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
                💰 Centro de Microcréditos
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Accede a financiación para impulsar tu emprendimiento
              </Typography>
            </Box>
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
      {loansLoading ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="body1">
            Cargando préstamos...
          </Typography>
        </Box>
      ) : loans.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ textAlign: 'center', py: 8 }}>
            <AccountBalance sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Aún no has solicitado préstamos
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Solicita tu primer microcrédito para impulsar tu emprendimiento
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Add />}
              onClick={() => setRequestDialogOpen(true)}
            >
              Solicitar Préstamo
            </Button>
          </Card>
        </motion.div>
      ) : (
        <Grid container spacing={3}>
          {loans.map((loan, index) => (
            <Grid item xs={12} sm={6} md={4} key={loan.id}>
              <LoanCard
                loan={loan}
                onMakePayment={openPaymentDialog}
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

