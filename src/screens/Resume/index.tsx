import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useTheme } from 'styled-components';

import { HistoryCard } from '../../components/HistoryCard';

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButtom,
    MonthSelectIcon,
    Month
} from './styles';

import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';

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
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme();

    async function loadData() {
        const dataKey = '@appfinancas:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const outputs = responseFormatted.
            filter((output: TransactionData) => output.type === 'negative');

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
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight()
                }}
            >

                <MonthSelect>
                    <MonthSelectButtom>
                        <MonthSelectIcon name="chevron-left" />
                    </MonthSelectButtom>

                    <Month>agosto</Month>

                    <MonthSelectButtom>
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
                    labelRadius={50}
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

        </Container>
    );
}