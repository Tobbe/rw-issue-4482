// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import UserProfilesLayout from 'src/layouts/UserProfilesLayout'
import PostsLayout from 'src/layouts/PostsLayout';

import BlogLayout from "src/layouts/BlogLayout";

const Routes = () => {
  return (
    (<Router>
      <Set wrap={UserProfilesLayout}>
            <Route path="/user-profiles/new" page={UserProfileNewUserProfilePage} name="newUserProfile" />
            <Route path="/user-profiles/{id}/edit" page={UserProfileEditUserProfilePage} name="editUserProfile" />
            <Route path="/user-profiles/{id}" page={UserProfileUserProfilePage} name="userProfile" />
            <Route path="/user-profiles" page={UserProfileUserProfilesPage} name="userProfiles" />
      </Set>
      <Set wrap={PostsLayout}>
            <Route path="/posts/new" page={PostNewPostPage} name="newPost" />
            <Route path="/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
            <Route path="/posts/{id:Int}" page={PostPostPage} name="post" />
            <Route path="/posts" page={PostPostsPage} name="posts" />
      </Set>
      <Set wrap={BlogLayout}>
        <Route path="/blog-post/{id:Int}" page={BlogPostPage} name="blogPost" />
        <Route path="/contact" page={ContactPage} name="contact" />
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set></Router>)
  );
}

export default Routes
