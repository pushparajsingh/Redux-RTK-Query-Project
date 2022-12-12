import "./App.css";
import {
  useGetPokemonByNameQuery,
  useDeletePostMutation,
  useEditPostMutation,
  useUpdatePostMutation,
  useViewPostMutation,
  useCreatePostMutation,
} from "./Redux/pokemon.js";
import { Button } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";

function App() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery();
  const [deletePost, response] = useDeletePostMutation();
  const [editPostData, respData] = useEditPostMutation();
  const [setCreatePost, PostData] = useCreatePostMutation();
  const [modalShow, setModalShow] = React.useState(false);
  const [ModelData, setModelData] = useState();
  const [setUpdate, Update] = useUpdatePostMutation();
  const [setViewData, viewDataPost] = useViewPostMutation();
  const [ids, setId] = useState();
  const [view, setView] = useState(true);
  const [createPostData, setCreatePostData] = useState();

  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  function editPost(id) {
    editPostData(id);
    setId(id);
    setModalShow(true);
  }
  useEffect(() => {
    setModelData(respData?.data?.name);
  }, [respData?.data?.name]);

  function submitData() {
    setUpdate({ ModelData, ids });
    setModalShow(false);
  }
  function viewData(id) {
    setView(false);
    setModalShow(true);
    setViewData(id);
  }
  console.log(222, viewDataPost.data);

  function CreateData({ target: { value } }) {
    setCreatePostData(value);
  }
  return (
    <div className="App">
      <div className="header">
        <h1 className="text">5 star celebration.com</h1>
        <div className="marginTop">
          <input
            type={"text"}
            className={"inputText"}
            placeholder="Create a new Post"
            value={createPostData}
            onChange={(e) => {
              CreateData(e);
            }}
          />
          <Button
            style={{ marginLeft: "8px" }}
            onClick={() => {
              createPostData && setCreatePost({ name: createPostData });
              setCreatePostData("");
            }}
          >
            Create Post
          </Button>
        </div>
      </div>
      <div className="body">
        <h1>Table Data</h1>
        <table
          cellPadding={"10px"}
          cellSpacing={"0px"}
          className="center"
          width={"800px"}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <img src={item.avatar} width={"100px"} alt="Image" />
                  </td>
                  <td>
                    <Stack direction="horizontal" gap={3}>
                      <Button
                        variant="success mr-3 offset-1"
                        onClick={() => viewData(item.id)}
                      >
                        View
                      </Button>
                      <Button
                        variant="warning mr-3"
                        onClick={() => {
                          editPost(item.id);
                        }}
                      >
                        edit
                      </Button>
                      <Button
                        variant="danger mr-3"
                        onClick={() => deletePost(item.id)}
                      >
                        delete
                      </Button>
                    </Stack>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {view ? (
            <>
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Edit Model
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <pre>
                  <span className="offset-1 display-6">update Name</span>{" "}
                  <input
                    type={"text"}
                    className={"inputText"}
                    value={ModelData}
                    onChange={(e) => setModelData(e.target.value)}
                    style={{ fontSize: "22px" }}
                  />
                </pre>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={submitData}>Submit</Button>
                <Button onClick={() => setModalShow(false)}>Close</Button>
              </Modal.Footer>
            </>
          ) : (
            <>
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  View Model
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={viewDataPost?.data?.avatar}
                  alt="Image of merical"
                  style={{ marginLeft: "41%" }}
                />
                <h2 style={{ textAlign: "center" }}>
                  {viewDataPost?.data?.name}
                </h2>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => {
                    setView(true);
                    setModalShow(false);
                  }}
                >
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default App;
