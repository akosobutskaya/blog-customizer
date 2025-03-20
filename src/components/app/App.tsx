import clsx from 'clsx';
import styles from './App.module.scss';
import { CSSProperties, useState } from 'react';
import { defaultArticleState } from '../../constants/articleProps';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article/Article';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				setArticleState={setArticleState}
			/>
			<Article />
		</main>
	);
};
