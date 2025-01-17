import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native'

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

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
    LogoutButton,
    LoadContainer
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HightlightProps {
    amount: string;
    lastTransaction: string;
}

interface HighlightData {
    entries: HightlightProps;
    outputs: HightlightProps;
    total: HightlightProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();

    const { signOut, user } = useAuth();

    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
        ) 
        {
        const collectionFiltered = collection
        .filter(transaction => transaction.type === type);

        if (collectionFiltered.length === 0) {
            return 0;
        }

        const lastTransactions = new Date (
        Math.max.apply(Math, collectionFiltered
        .map(transaction => new Date(transaction.date).getTime())));

        return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR', {
            month: 'long'
        })}`;
    };

    async function loadTransactions() {
        const dataKey = `@appfinancas:transactions_user:${user.id}`;
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

        const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransactionsOutputs = getLastTransactionDate(transactions, 'negative');
        const totalInterval = lastTransactionsOutputs === 0 ? 'Não há transações.' : `01 a ${lastTransactionsOutputs}`;

        const total = entriesTotal - outputsTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionsEntries === 0 
                ? 'Não há transações.' 
                : `Última entrada dia ${lastTransactionsEntries}`
            },
            outputs: {
                amount: outputsTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionsOutputs === 0
                ? 'Não há transações.'
                : `Última saída dia ${lastTransactionsOutputs}`
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
        });

        setIsLoading(false);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>

            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            color={theme.colors.black}
                            size='large'
                        />
                    </LoadContainer> :
                    <>
                        <Header>
                            <UserWrapper>
                                <UserInfo>
                                    <Photo
                                        source={{ uri: user.photo }}
                                    />
                                    <User>
                                        <UserGreeting>Olá,</UserGreeting>
                                        <UserName>{user.name}</UserName>
                                    </User>
                                </UserInfo>

                                <LogoutButton onPress={signOut}>
                                    <Icon name="power" />
                                </LogoutButton>

                            </UserWrapper>
                        </Header>
                        <HighlightCards>
                            <HighlightCard
                                title="Entradas"
                                amount={highlightData.entries.amount}
                                lastTransaction={highlightData.entries.lastTransaction}
                                type="up"
                            />
                            <HighlightCard
                                title="Saídas"
                                amount={highlightData.outputs.amount}
                                lastTransaction={highlightData.outputs.lastTransaction}
                                type="down"
                            />
                            <HighlightCard
                                title="Total"
                                amount={highlightData.total.amount}
                                lastTransaction={highlightData.total.lastTransaction}
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
                    </>
            }
        </Container>
    )
}