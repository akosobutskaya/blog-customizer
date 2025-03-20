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
	defaultArticleState,
} from 'src/constants/articleProps';
import { useClose } from './hook/useClose';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const [sideBarState, setSideBarState] =
		useState<ArticleStateType>(articleState);

	const changeFontFamily = (select: OptionType) => {
		setSideBarState({ ...sideBarState, fontFamilyOption: select });
	};

	const changeFontSize = (select: OptionType) => {
		setSideBarState({ ...sideBarState, fontSizeOption: select });
	};

	const changeFontColor = (select: OptionType) => {
		setSideBarState({ ...sideBarState, fontColor: select });
	};

	const changeContainerWidth = (select: OptionType) => {
		setSideBarState({ ...sideBarState, contentWidth: select });
	};

	const changeBgColor = (select: OptionType) => {
		setSideBarState({ ...sideBarState, backgroundColor: select });
	};

	const resetSidebarState = () => {
		setArticleState(defaultArticleState);
		setSideBarState(defaultArticleState);
	};

	const applySideBarState = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(sideBarState);
	};

	useClose({
		isOpen: isFormOpen,
		onClose: () => setIsFormOpen(false),
		rootRef: formRef,
	});

	const toggleArticleParamsForm = useCallback(() => {
		setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
	}, []);

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleArticleParamsForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					ref={formRef}
					onSubmit={applySideBarState}>
					<Text size={31} weight={800} uppercase as={'h3'} align='center'>
						Задайте параметры
					</Text>
					<span className={styles.span} />
					<Select
						selected={sideBarState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={changeFontFamily}
						title='Шрифт'
					/>
					<span className={styles.span} />
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={sideBarState.fontSizeOption}
						onChange={changeFontSize}
						title='Размер'
					/>
					<span className={styles.span} />
					<Select
						selected={sideBarState.fontColor}
						options={fontColors}
						onChange={changeFontColor}
						title='Цвет шрифта'
					/>
					<span className={styles.span} />
					<Separator />
					<span className={styles.span} />
					<Select
						selected={sideBarState.backgroundColor}
						options={backgroundColors}
						onChange={changeBgColor}
						title='Цвет фона'
					/>
					<span className={styles.span} />
					<Select
						selected={sideBarState.contentWidth}
						options={contentWidthArr}
						onChange={changeContainerWidth}
						title='Ширина контента'
					/>
					<span className={styles.span} />
					<div className={clsx(styles.bottomContainer)}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetSidebarState}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
