const Loan = require('../../models/Loan');

describe('Loan Model', () => {
  it('crea un préstamo con todos los campos', () => {
    const loanData = {
      user: '507f1f77bcf86cd799439011',
      amount: 1000000,
      purpose: 'Comprar maquinaria',
      termMonths: 12,
      interestRate: 2.5,
      status: 'pending',
      monthlyPayment: 90000,
      totalAmount: 1080000,
      remainingAmount: 1080000,
      requestedAt: new Date(),
    };

    const loan = new Loan(loanData);
    
    expect(loan.amount).toBe(1000000);
    expect(loan.purpose).toBe('Comprar maquinaria');
    expect(loan.termMonths).toBe(12);
    expect(loan.status).toBe('pending');
  });

  it('acepta monthlyPayment como parámetro', () => {
    const loan = new Loan({
      user: '507f1f77bcf86cd799439011',
      amount: 1000000,
      purpose: 'Test',
      termMonths: 12,
      interestRate: 2.5,
      status: 'approved',
      monthlyPayment: 90000,
    });

    expect(loan.monthlyPayment).toBe(90000);
  });

  it('tiene un campo id que mapea _id', () => {
    const loan = new Loan({
      user: '507f1f77bcf86cd799439011',
      amount: 500000,
      purpose: 'Test',
      termMonths: 6,
      interestRate: 2.5,
      status: 'pending',
    });

    loan._id = '507f1f77bcf86cd799439012';
    expect(loan.id).toBe('507f1f77bcf86cd799439012');
  });

  it('acepta diferentes estados', () => {
    const statuses = ['pending', 'approved', 'rejected'];
    
    statuses.forEach(status => {
      const loan = new Loan({
        user: '507f1f77bcf86cd799439011',
        amount: 500000,
        purpose: 'Test',
        termMonths: 6,
        interestRate: 2.5,
        status: status,
      });
      
      expect(loan.status).toBe(status);
    });
  });
});
