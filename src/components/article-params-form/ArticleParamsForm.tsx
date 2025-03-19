import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { FormEvent, useRef, useState, useCallback } from 'react';
import { Text } from 'src/ui/text/Text';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator/Separator';
import {
	OptionType,
	fontFamilyOptions,
	ArticleStateType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useClose } from './hook/useClose';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	fontFamily: (select: OptionType) => void;
	fontSize: (select: OptionType) => void;
	fontColor: (select: OptionType) => void;
	backgroundColor: (select: OptionType) => void;
	contentWidth: (select: OptionType) => void;
	resetButton: () => void;
	applyButton: (event: FormEvent) => void;
	sideBarState: ArticleStateType;
};

export const ArticleParamsForm = ({
	fontFamily,
	fontSize,
	fontColor,
	backgroundColor,
	contentWidth,
	resetButton,
	applyButton,
	sideBarState,
}: ArticleParamsFormProps) => {
	const ref = useRef<HTMLFormElement | null>(null);
	const [open, setOpen] = useState(false);

	useClose({
		isOpen: open,
		onClose: () => setOpen(false),
		rootRef: ref,
	});

	const toggleForm = useCallback(() => {
		setOpen((prevOpen) => !prevOpen);
	}, []);

	return (
		<>
			<ArrowButton isOpen={open} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form className={styles.form} ref={ref} onSubmit={applyButton}>
					<Text size={31} weight={800} uppercase as={'h3'} align='center'>
						Задайте параметры
					</Text>
					<span className={styles.span} />
					<Select
						selected={sideBarState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={fontFamily}
						title='Шрифт'
					/>
					<span className={styles.span} />
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={sideBarState.fontSizeOption}
						onChange={fontSize}
						title='Размер'
					/>
					<span className={styles.span} />
					<Select
						selected={sideBarState.fontColor}
						options={fontColors}
						onChange={fontColor}
						title='Цвет шрифта'
					/>
					<span className={styles.span} />
					<Separator />
					<span className={styles.span} />
					<Select
						selected={sideBarState.backgroundColor}
						options={backgroundColors}
						onChange={backgroundColor}
						title='Цвет фона'
					/>
					<span className={styles.span} />
					<Select
						selected={sideBarState.contentWidth}
						options={contentWidthArr}
						onChange={contentWidth}
						title='Ширина контента'
					/>
					<span className={styles.span} />
					<div className={clsx(styles.bottomContainer)}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetButton}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
