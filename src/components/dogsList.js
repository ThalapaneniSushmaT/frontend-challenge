
//React imports
import { FormControl, Fab, Badge, Grid, MenuItem, Select, Table, TableBody, TablePagination, TableCell, TableContainer, TableHead, TableRow, InputLabel, OutlinedInput, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { every, map, remove, set } from "lodash";
import "../App.css";

import { getAllDogBreeds, getAllDogsList, getFilteredDogBreeds } from "../services/dogs.service";

import { FavoritesModal, ImageInfoModal } from "../uikit/modal";

const COLUMNS = [
  { id: 'id', label: 'ID' },
  { id: 'url', label: 'Image' },
  { id: 'breedname', label: 'Breed' },
  { id: 'favorite', label: '' },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DogsList = () => {


  const [dogImages, setDogImages] = useState([]);
  const [breeds, setAllBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fav, setFav] = useState([]);
  const [openFavModal, setFavModalOpen] = useState(false);
  const [openImgDetailsModal, setImgDetailsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [favAll, setFavAll] = useState(false);

  const handleChangePage = (event, newPage) => {
    setFavAll(false);
    setPage(newPage);
    getAllDogs(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setFavAll(false);
    setRowsPerPage(event.target.value);
    setPage(0);
    getAllDogs(0, event.target.value);
  };

  const getAllBreeds = async () => {
    let payload = {
      limit: "",
      page: 0
    }
    try {
      const res = await getAllDogBreeds(payload);
      setAllBreeds(res?.data)
    } catch (error) {

    }
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFavAll(false);
    setSelectedBreed(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    getFilteredDogs(value.id);
  };

  const getAllDogs = async (page, limit) => {
    let payload = {
      order: "ASC",
      limit,
      page
    }
    try {
      const res = await getAllDogsList(payload);
      setDogImages(res?.data || []);
    } catch (error) { }
  }

  const getFilteredDogs = async (id) => {
    try {
      const res = await getFilteredDogBreeds(id);
      setDogImages(res?.data);
    } catch (error) {

    }
  }

  const addFav = (dogImg) => {
    set(dogImg, "favorite", true);
    let favAll = every(dogImages, ["favorite", true]);
    setFavAll(favAll);
    setFav([...fav, dogImg]);
    setDogImages(dogImages);
  }
  const removeFav = (dogImg) => {
    set(dogImg, "favorite", false);
    let dogs = dogImages.slice(0, rowsPerPage);
    remove(fav, dogImg);
    let favAll = every(dogs, ["favorite", true]);
    setFavAll(favAll);
    setFav(fav);
    setDogImages(dogs);
  };

  const removeFavAll = () => {
    map(dogImages, (dogImg) => set(dogImg, "favorite", false));
    setFavAll(false);
    setFav([]);
  }

  const addFavAll = () => {
    map(dogImages, (dogImg) => set(dogImg, "favorite", true));
    setFavAll(true);
    setFav(dogImages);
  }


  const getImageDetails = (id) => {
    setSelectedImage(id);
    setImgDetailsModalOpen(true);
  }

  const clearFilters = async () => {
    if (!selectedBreed) {
      return;
    }
    setSelectedBreed("");
    setPage(0);
    setRowsPerPage(5);
    await getAllDogs(0, 5);
    await getAllBreeds();
  }

  useEffect(() => {
    getAllDogs(0, 5);
    getAllBreeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid className="layout" justify="center">
      <h1 align="center">Dogstagram</h1>
      <Grid sx={{ mb: 2 }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Filter by breed</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={selectedBreed}
            onChange={handleChange}
            input={<OutlinedInput label="Filter by breed" />}
            MenuProps={MenuProps}
          >
            {breeds.map((breed, index) => {
              return <MenuItem key={breed.id} value={breed}>{breed?.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <span className={selectedBreed ? "link" : "disabled"} onClick={clearFilters}>Clear Filter</span>
        <Badge style={{ margin: "15px 0 0 0", float: "right" }} title="Favourites" badgeContent={fav?.length} color="secondary">
          <Fab onClick={() => setFavModalOpen(true)} size="small" aria-label="like">
            {
              fav?.length ? <FavoriteIcon sx={{ color: "#ffc105" }} color="pink" /> : <FavoriteBorderIcon />
            }
          </Fab>
        </Badge>
      </Grid>
      {
        openFavModal && (
          <FavoritesModal favorites={fav} onClose={() => setFavModalOpen(false)} />
        )
      }
      {
        openImgDetailsModal && (
          <ImageInfoModal id={selectedImage} onClose={() => setImgDetailsModalOpen(false)} />
        )
      }
      <TableContainer component={Paper} sx={{ maxHeight: 440, border: "1px solid #6eb9f7" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{ background: "grey" }}>
            <TableRow>
              {COLUMNS.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.id === "favorite" ? favAll ? <FavoriteIcon sx={{ color: "#ffc105" }} color="pink" onClick={removeFavAll} /> : <FavoriteBorderIcon onClick={ addFavAll} /> : column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dogImages
              .map((dogImg) => (
                <TableRow key={dogImg.id}>
                  <>
                    <TableCell  >
                      {dogImg.id}
                    </TableCell>
                    <TableCell >
                      <img src={dogImg.url} alt="Broken" style={{ height: "60px", width: "60px", cursor: "pointer" }}
                        onClick={() => getImageDetails(dogImg.id)} />
                    </TableCell>
                    <TableCell >
                      {dogImg?.breeds?.[0]?.name || "N/A"}
                    </TableCell>
                    <TableCell>
                      {
                        dogImg?.favorite ? (
                          <FavoriteIcon sx={{ color: "#ffc105", cursor: "pointer" }} onClick={() => removeFav(dogImg)} />
                        ) : (
                          <FavoriteBorderIcon sx={{ cursor: "pointer" }} onClick={() => addFav(dogImg)} />
                        )
                      }
                    </TableCell>
                  </>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      {
        !selectedBreed && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={100}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )
      }
    </Grid >
  )
}



export default DogsList;