import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList,
    LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HightlightProps {
    amount: string;
}

interface HighlightData {
    entries: HightlightProps;
    outputs: HightlightProps;
    total: HightlightProps;
}

export function Dashboard() {

    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    async function loadTransactions() {
        const dataKey = '@appfinancas:transactions';
        const response = await AsyncStorage.getItem(dataKey);

        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let outputsTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {

                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount);
                } else {
                    outputsTotal += Number(item.amount);
                }

                const amount = Number(item.amount)
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date
                }
            });

        setTransactions(transactionsFormatted);

        const total = entriesTotal - outputsTotal;
        
        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            outputs: {
                amount: outputsTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            }
        });
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: 'https://avatars.githubusercontent.com/u/54956887?v=4' }}
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>João Victor</UserName>
                        </User>
                    </UserInfo>

                    <LogoutButton onPress={() => { }}>
                        <Icon name="power" />
                    </LogoutButton>

                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard
                    title="Entradas"
                    amount={highlightData.entries.amount}
                    lastTransaction="Última entrada dia 9 de março"
                    type="up"
                />
                <HighlightCard
                    title="Saídas"
                    amount={highlightData.outputs.amount}
                    lastTransaction="Última saída dia 2 de março"
                    type="down"
                />
                <HighlightCard
                    title="Total"
                    amount={highlightData.total.amount}
                    lastTransaction="02 à 09 de março"
                    type="total"
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionsList
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />

            </Transactions>

        </Container>
    )
}