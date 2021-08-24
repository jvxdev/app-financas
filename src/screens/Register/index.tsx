import React, { useState } from 'react';

import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../../components/Forms/CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from './styles';

export function Register() {
    const [transactionType, setTransactionType] = useState('');

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input
                        placeholder="Nome"
                    />

                    <Input
                        placeholder="Preço"
                    />

                    <TransactionTypes>
                        <TransactionTypeButton
                            type="up"
                            title="Income"
                            isActive={transactionType === 'up'}
                            onPress={() => handleTransactionTypeSelect('up')}
                        />

                        <TransactionTypeButton
                            type="down"
                            title="Outcome"
                            isActive={transactionType === 'down'}
                            onPress={() => handleTransactionTypeSelect('down')}
                        />
                    </TransactionTypes>

                    <CategorySelect title="Categoria" />

                </Fields>

                <Button title="Enviar" />
            </Form>
        </Container>
    );
}