import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from '../../components/HistoryCard';

import {
    Container,
    Header,
    Title,
    Content
} from './styles';

import { categories } from '../../utils/categories';

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
    total: string;
    color: string;
    percentFormatted: string;
    percent: number;
}

export function Resume() {
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

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
                const total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                const percent = (categorySum / outputsTotal * 100);
                const percentFormatted = `${percent.toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total,
                    color: category.color,
                    percent,
                    percentFormatted
                });
            }
        });

        console.log(totalByCategory);

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

            <Content>
                {
                    totalByCategories.map(item => (
                        <HistoryCard
                            key={item.key}
                            title={item.name}
                            amount={item.total}
                            color={item.color}
                        />
                    ))
                }
            </Content>

        </Container>
    );
}