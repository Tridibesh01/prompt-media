'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState();
	const [posts, setPosts] = useState([]);

	// Search states
	// const [filteredPosts, setFilteredPosts] = useState([]);

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	const handleTagClick = (tagName) => {
		setSearchText(tagName);
	};

	const filterPrompts = (searchtext) => {
		const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
		return posts.filter((item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt));
	};

	const filteredPosts = filterPrompts(searchText);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt');
			const data = await response.json();
			// console.log(data);
			setPosts(data);
		};

		fetchPosts();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
			</form>
			<PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
		</section>
	);
};

export default Feed;
