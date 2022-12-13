import React, { Component } from "react";
import "./JsonPlaceholder.css";

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
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ posts: data });
      });
  }

  postPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        title: "post title",
        body: "post body",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const newPosts = [...this.state.posts, data];
        this.setState({ posts: newPosts });
      });
  }

  putPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      body: JSON.stringify({
        userId: 1,
        title: "Updated title",
        body: "Updated body",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const newPosts = this.state.posts.map((current) => {
          if (current.id === data.id) return data;
          return current;
        });
        this.setState({ posts: newPosts });
      });
  }

  deletePosts() {
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
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
