import React, { useEffect, useState, FC } from 'react';
import {
    CustomIcon,
    CustomSafeArea,
    CustomStatusBar,
    CustomText,
    CustomView,
} from '~Components';
import { FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Wallet, ZombieContract } from '~Web3';
import { Constants } from '~Utils';
import { Zombie } from '~Types';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const getTheZs = (zombieId: number): Promise<Zombie> => {
    return new Promise((resolve, reject) => {
        ZombieContract.zombies(zombieId.toString())
            .then((zombie: Zombie) => {
                resolve(zombie);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};

export const OtherScreen = () => {
    const focus = useIsFocused();
    const navigation = useNavigation();
    const bottom = useBottomTabBarHeight();
    const [zombies, setZombies] = useState<Zombie[]>([]);

    useEffect(() => {
        const init = async () => {
            const allPromises: Promise<Zombie>[] = [];
            const allIds: number[] = [];

            try {
                const zombiesIdsByOwner: number[] =
                    await ZombieContract.getZombiesByOwner(Wallet.address);

                for (const zombieId of zombiesIdsByOwner) {
                    allPromises.push(getTheZs(zombieId));
                    allIds.push(zombieId);
                }

                const res = await Promise.all(allPromises);
                const _zombies = res.map((z, index) => {
                    const obj = {
                        index: allIds[index],
                        ...z,
                    };

                    return obj;
                });
                setZombies(_zombies);
            } catch (error) {
                console.log(error);
            }
        };

        Wallet.address && init();
    }, [focus]);

    const navigateToZombieDetail = (zombie: Zombie) => {
        navigation.navigate('ZombieDetail', { zombie });
    };

    return (
        <>
            <CustomStatusBar translucent />
            <CustomSafeArea />

            <FlatList
                contentContainerStyle={{ paddingBottom: bottom }}
                showsVerticalScrollIndicator={false}
                data={zombies}
                keyExtractor={item => item.dna.toString()}
                renderItem={({ item }) => (
                    <ZombieRow zombie={item} action={navigateToZombieDetail} />
                )}
                ListHeaderComponent={() => (
                    <CustomText font="title" mg={[0, 0, 40, 0]}>
                        My Zombies
                    </CustomText>
                )}
            />
        </>
    );
};

type Props = {
    zombie: Zombie;
    action: (zombie: Zombie) => void;
};

const isKittyZ = (dna: number): boolean => {
    return dna.toString().slice(-2) === '99';
};

const ZombieRow: FC<Props> = ({ zombie, action }) => {
    return (
        <TouchableOpacity onPress={() => action(zombie)}>
            <CustomView
                orientation="row"
                justify="space-between"
                background={isKittyZ(zombie.dna) ? '#d2ffd9' : '#e9edff'}
                mg={[5, 5, 5, 5]}
                pd={[5, 5, 5, 5]}>
                <CustomView
                    justify="flex-start"
                    align="flex-start"
                    style={{ borderRadius: 6 }}>
                    <CustomText font="subTitle" mg={[2, 2, 0, 0]}>
                        {zombie.name} {isKittyZ(zombie.dna) ? '😺' : '🧟‍♂️'}
                    </CustomText>
                    <CustomText font="body" mg={[2, 2, 0, 0]}>
                        Level: {zombie.level}
                    </CustomText>
                    <CustomText
                        font="caption"
                        numberOfLines={1}
                        mg={[2, 2, 0, 0]}
                        pd={[0, 10, 0, 0]}>
                        DNA: {zombie.dna.toString()}
                    </CustomText>
                </CustomView>

                <CustomIcon
                    size={32}
                    name={Constants.rightArrow}
                    style={{ marginLeft: -20 }}
                />
            </CustomView>
        </TouchableOpacity>
    );
};
