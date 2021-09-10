import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { HistoryCard } from '../../components/HistoryCard';

import { categories } from '../../utils/categories';


import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButtom,
    MonthSelectIcon,
    Month,
    LoadContainer
} from './styles';



interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function Resume() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const { user } = useAuth();

    const theme = useTheme();

    function handleDateChange(action: 'next' | 'prev') {
        if (action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function loadData() {
        setIsLoading(true);
        const dataKey = `@appfinancas:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const outputs = responseFormatted
            .filter((output: TransactionData) =>
                output.type === 'negative' &&
                new Date(output.date).getMonth() === selectedDate.getMonth() &&
                new Date(output.date).getFullYear() === selectedDate.getFullYear()
            );

        console.log(outputs);

        const outputsTotal = outputs
            .reduce((accumulator: number, output: TransactionData) => {
                return accumulator + Number(output.amount);
            }, 0);

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            outputs.forEach((output: TransactionData) => {
                if (output.category === category.key) {
                    categorySum += Number(output.amount);
                }
            });

            if (categorySum > 0) {
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                const percent = `${(categorySum / outputsTotal * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    totalFormatted,
                    color: category.color,
                    percent
                });
            }
        });

        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectedDate]));

    return (
        <Container>

            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            color={theme.colors.black}
                            size='large'
                        />
                    </LoadContainer> :

                    <Content
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            paddingBottom: useBottomTabBarHeight()
                        }}
                    >

                        <MonthSelect>
                            <MonthSelectButtom onPress={() => handleDateChange('prev')}>
                                <MonthSelectIcon name="chevron-left" />
                            </MonthSelectButtom>

                            <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

                            <MonthSelectButtom onPress={() => handleDateChange('next')}>
                                <MonthSelectIcon name="chevron-right" />
                            </MonthSelectButtom>
                        </MonthSelect>

                        <ChartContainer>
                            <VictoryPie
                                data={totalByCategories}
                                colorScale={totalByCategories.map(category => category.color)}
                                style={{
                                    labels: {
                                        fontSize: RFValue(18),
                                        fontWeight: 'bold',
                                        fill: theme.colors.shape
                                    },
                                }}
                                labelRadius={70}
                                x="percent"
                                y="total"
                            />
                        </ChartContainer>
                        {
                            totalByCategories.map(item => (
                                <HistoryCard
                                    key={item.key}
                                    title={item.name}
                                    amount={item.totalFormatted}
                                    color={item.color}
                                />
                            ))
                        }
                    </Content>
            }
        </Container>
    );
}