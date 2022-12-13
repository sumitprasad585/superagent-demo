import React, { Component } from "react";
import "./JsonPlaceholder.css";
import request from "superagent";

class JsonPlaceholder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.getPosts = this.getPosts.bind(this);
    this.postPosts = this.postPosts.bind(this);
    this.putPosts = this.putPosts.bind(this);
    this.deletePosts = this.deletePosts.bind(this);
  }

  /* 
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ posts: data });
      });
  }
   */

  /* 
  async componentDidMount() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    this.setState({ posts: data });
  }
   */

  getPosts() {
    request
      .get("https://jsonplaceholder.typicode.com/posts")
      .end((err, res) => {
        if (err) {
          // error handling code here
          return;
        }
        this.setState({ posts: JSON.parse(res.text) });
      });
  }

  postPosts() {
    const newPost = {
      userId: 1,
      title: "new post title",
      body: "new post body",
    };

    request
      .post("https://jsonplaceholder.typicode.com/posts")
      .set({ "Content-type": "application/json" })
      .send(newPost) // Since JSON is undoubtedly the most common, it's the default! so we don't need to explicitly write JSON.stringify()
      .end((err, res) => {
        if (err) {
          // error handling code here
          return;
        }
        const newPosts = [...this.state.posts, JSON.parse(res.text)];
        this.setState({ posts: newPosts });
      });
  }

  putPosts() {
    const updatedPost = {
      userId: 1,
      title: "updated title",
      body: "updated body",
    };

    request
      .put("https://jsonplaceholder.typicode.com/posts/1")
      .set({ "Content-type": "application/json" })
      .send(updatedPost)
      .end((err, res) => {
        if (err) {
          // error handling code here
          return;
        }
        const newPost = JSON.parse(res.text);
        const newPosts = this.state.posts.map((current) => {
          if (current.id === newPost.id) return newPost;
          return current;
        });
        this.setState({ posts: newPosts });
      });
  }

  deletePosts() {
    request
      .delete("https://jsonplaceholder.typicode.com/posts/1")
      .end((err, res) => {
        if (err) {
          // error handling code here
          return;
        }
        const newPosts = this.state.posts.filter((current) => current.id !== 1);
        this.setState({ posts: newPosts });
      });
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="JsonPlaceholder">
        <button onClick={this.getPosts}>Get Request</button>
        <button onClick={this.postPosts}>Post Request</button>
        <button onClick={this.putPosts}>Put Request</button>
        <button onClick={this.deletePosts}>Delete Request</button>

        <div className="JsonPlaceholder-posts">
          {posts.length === 0 ? (
            <h1>No posts</h1>
          ) : (
            posts.map((current) => {
              return (
                <div key={current.id} className="post">
                  <h1>{current.title}</h1>
                  <p>{current.id}</p>
                  <p>{current.body}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default JsonPlaceholder;
