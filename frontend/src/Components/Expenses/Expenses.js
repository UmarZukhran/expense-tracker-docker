import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItems/IncomeItems';
import ExpenseForm from './ExpenseForm';
import { rupiah } from '../../utils/rupiahFormat';

function Expenses() {
    const {addExpense, expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [])
    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expense">Total Expense: <span>{rupiah(totalExpenses())}</span></h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses">
                        {expenses.map((expense) => {
                            const {_id, title, amount, date, category, description, type} = expense;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={rupiah(amount)} 
                                date={date} 
                                type='expense'
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expense{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #DBAFA0;
        border: 2px solid #DBAFA0;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2rem;
            font-weight: 600;
            color: red;
        }
    }
    .expense-content{
        display: flex;
        gap: 2rem;
        .expenses{
            flex: 1;
        }
    }
`;

export default Expenses