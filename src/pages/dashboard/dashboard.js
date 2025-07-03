import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_BOARDS } from '../../apolloClient/query';
import {
  ADD_CARD,
  ADD_LIST,
  DELETE_CARD,
  DELETE_LIST,
  UPDATE_CARD,
  UPDATE_LIST,
} from '../../apolloClient/mutation';

const TrelloBoard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const { data, loading, refetch } = useQuery(GET_BOARDS);
  const [addList] = useMutation(ADD_LIST);
  const [updateList] = useMutation(UPDATE_LIST);
  const [deleteList] = useMutation(DELETE_LIST);
  const [addCard] = useMutation(ADD_CARD);
  const [updateCard] = useMutation(UPDATE_CARD);
  const [deleteCard] = useMutation(DELETE_CARD);

  const [openListDialog, setOpenListDialog] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [openCardDialog, setOpenCardDialog] = useState(false);
  const [currentListId, setCurrentListId] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDesc, setNewCardDesc] = useState('');
  const [openUpdateListDialog, setOpenUpdateListDialog] = useState(false);
  const [updateListTitle, setUpdateListTitle] = useState('');
  const [updateListId, setUpdateListId] = useState(null);
  const [openUpdateCardDialog, setOpenUpdateCardDialog] = useState(false);
  const [updateCardTitle, setUpdateCardTitle] = useState('');
  const [updateCardDesc, setUpdateCardDesc] = useState('');
  const [updateCardData, setUpdateCardData] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <Typography color="white">Loading...</Typography>;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('accessToken');

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('accessToken');

    localStorage.removeItem('user');
    sessionStorage.removeItem('user');

    navigate('/');
  };

  const handleAddList = async (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    await addList({ variables: { title: newListTitle } });
    setNewListTitle('');
    setOpenListDialog(false);
    refetch();
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (!newCardTitle.trim() || !newCardDesc.trim()) return;
    await addCard({
      variables: {
        listId: currentListId,
        title: newCardTitle,
        description: newCardDesc,
      },
    });
    setNewCardTitle('');
    setNewCardDesc('');
    setOpenCardDialog(false);
    refetch();
  };

  const handleUpdateList = async (e) => {
    e.preventDefault();
    if (!updateListTitle.trim()) return;
    await updateList({
      variables: { id: updateListId, title: updateListTitle },
    });
    setOpenUpdateListDialog(false);
    setUpdateListTitle('');
    refetch();
  };

  const handleUpdateCard = async (e) => {
    e.preventDefault();
    await updateCard({
      variables: {
        id: updateCardData._id,
        listId: updateCardData.listId,
        title: updateCardTitle,
        description: updateCardDesc,
      },
    });
    setOpenUpdateCardDialog(false);
    setUpdateCardData(null);
    refetch();
  };

  const handleDragEnd = async (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === 'CARD') {
      const sourceList = data.lists.data.find(
        (c) => c._id === source.droppableId
      );
      const movedCard = sourceList.cards[source.index];
      await updateCard({
        variables: {
          id: movedCard._id,
          listId: destination.droppableId,
          title: movedCard.title,
          description: movedCard.description,
        },
      });
      refetch();
    }
  };

  const getColumnWidth = () => {
    if (isMobile) return 280;
    if (isTablet) return 300;
    return 320;
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom right, #5b2a82, #c850c0)',
        minHeight: '100vh',
        p: isMobile ? 1 : 2,
      }}
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              flexGrow: 1,
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
            }}
          >
            My Trello Board
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            size={isMobile ? 'small' : 'medium'}
            sx={{
              mr: 1,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
          {/* {!isMobile && <Avatar sx={{ bgcolor: '#5b2a82', ml: 1 }}>AJ</Avatar>} */}
        </Toolbar>
      </AppBar>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(boardProv) => (
            <Box
              ref={boardProv.innerRef}
              {...boardProv.droppableProps}
              sx={{
                display: 'flex',
                gap: { xs: 1, sm: 2 },
                mt: { xs: 1, sm: 2 },
                overflowX: 'auto',
                pb: 2,
                '&::-webkit-scrollbar': {
                  height: 8,
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 4,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  borderRadius: 4,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.5)',
                  },
                },
              }}
            >
              {data?.lists?.data.map((column, ci) => (
                <Draggable key={column._id} draggableId={column._id} index={ci}>
                  {(prov) => (
                    <Box
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      {...prov.dragHandleProps}
                      sx={{
                        minWidth: getColumnWidth(),
                        maxWidth: getColumnWidth(),
                        flexShrink: 0,
                      }}
                    >
                      <Card
                        sx={{
                          bgcolor: '#1e1e1e',
                          color: '#fff',
                          maxHeight: { xs: '70vh', sm: '75vh', md: '80vh' },
                          overflowY: 'auto',
                          '&::-webkit-scrollbar': {
                            width: 6,
                          },
                          '&::-webkit-scrollbar-track': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(255,255,255,0.3)',
                            borderRadius: 3,
                          },
                        }}
                      >
                        <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mb: 1 }}
                          >
                            <Typography
                              variant={isMobile ? 'subtitle1' : 'h6'}
                              sx={{
                                fontWeight: 500,
                                fontSize: { xs: '1rem', sm: '1.25rem' },
                                wordBreak: 'break-word',
                                mr: 1,
                              }}
                            >
                              {column.title}
                            </Typography>
                            <Box sx={{ display: 'flex', flexShrink: 0 }}>
                              <IconButton
                                size="small"
                                sx={{
                                  color: '#fff',
                                  p: { xs: 0.5, sm: 1 },
                                }}
                                onClick={() => {
                                  setUpdateListTitle(column.title);
                                  setUpdateListId(column._id);
                                  setOpenUpdateListDialog(true);
                                }}
                              >
                                <EditIcon
                                  fontSize={isMobile ? 'small' : 'medium'}
                                />
                              </IconButton>
                              <IconButton
                                size="small"
                                sx={{
                                  color: '#fff',
                                  p: { xs: 0.5, sm: 1 },
                                }}
                                onClick={() => {
                                  if (window.confirm('Delete this list?')) {
                                    deleteList({
                                      variables: { id: column._id },
                                    }).then(refetch);
                                  }
                                }}
                              >
                                <DeleteIcon
                                  fontSize={isMobile ? 'small' : 'medium'}
                                />
                              </IconButton>
                              {!isMobile && (
                                <IconButton size="small" sx={{ color: '#fff' }}>
                                  <MoreVertIcon />
                                </IconButton>
                              )}
                            </Box>
                          </Box>

                          <Droppable droppableId={column._id} type="CARD">
                            {(prov2) => (
                              <Box
                                ref={prov2.innerRef}
                                {...prov2.droppableProps}
                                sx={{ minHeight: 100 }}
                              >
                                {column.cards.map((card, idx) => (
                                  <Draggable
                                    key={card._id}
                                    draggableId={card._id}
                                    index={idx}
                                  >
                                    {(prov3) => (
                                      <Box
                                        ref={prov3.innerRef}
                                        {...prov3.draggableProps}
                                        {...prov3.dragHandleProps}
                                        sx={{
                                          bgcolor: '#2c2c2e',
                                          borderRadius: 1,
                                          p: { xs: 1, sm: 1.5 },
                                          mb: 1,
                                          position: 'relative',
                                          cursor: 'pointer',
                                          '&:hover': {
                                            bgcolor: '#3a3a3c',
                                          },
                                        }}
                                        style={prov3.draggableProps.style}
                                      >
                                        <Typography
                                          color="white"
                                          sx={{
                                            fontSize: {
                                              xs: '0.875rem',
                                              sm: '1rem',
                                            },
                                            wordBreak: 'break-word',
                                            pr: { xs: 4, sm: 5 },
                                          }}
                                        >
                                          {card.title}
                                        </Typography>
                                        {card.description && (
                                          <Typography
                                            variant="caption"
                                            color="gray"
                                            sx={{
                                              fontSize: {
                                                xs: '0.75rem',
                                                sm: '0.875rem',
                                              },
                                              wordBreak: 'break-word',
                                              display: 'block',
                                              mt: 0.5,
                                              pr: { xs: 4, sm: 5 },
                                            }}
                                          >
                                            {card.description}
                                          </Typography>
                                        )}
                                        <Box
                                          sx={{
                                            position: 'absolute',
                                            top: { xs: 4, sm: 8 },
                                            right: { xs: 4, sm: 8 },
                                            display: 'flex',
                                            gap: 0.5,
                                          }}
                                        >
                                          <IconButton
                                            size="small"
                                            color="inherit"
                                            sx={{
                                              p: { xs: 0.25, sm: 0.5 },
                                              '&:hover': {
                                                bgcolor:
                                                  'rgba(255,255,255,0.1)',
                                              },
                                            }}
                                            onClick={() => {
                                              setUpdateCardData(card);
                                              setUpdateCardTitle(card.title);
                                              setUpdateCardDesc(
                                                card.description || ''
                                              );
                                              setOpenUpdateCardDialog(true);
                                            }}
                                          >
                                            <EditIcon
                                              fontSize={
                                                isMobile ? 'small' : 'medium'
                                              }
                                            />
                                          </IconButton>
                                          <IconButton
                                            size="small"
                                            color="inherit"
                                            sx={{
                                              p: { xs: 0.25, sm: 0.5 },
                                              '&:hover': {
                                                bgcolor:
                                                  'rgba(255,255,255,0.1)',
                                              },
                                            }}
                                            onClick={() => {
                                              if (
                                                window.confirm(
                                                  'Delete this card?'
                                                )
                                              ) {
                                                deleteCard({
                                                  variables: { id: card._id },
                                                }).then(refetch);
                                              }
                                            }}
                                          >
                                            <DeleteIcon
                                              fontSize={
                                                isMobile ? 'small' : 'medium'
                                              }
                                            />
                                          </IconButton>
                                        </Box>
                                      </Box>
                                    )}
                                  </Draggable>
                                ))}
                                {prov2.placeholder}
                                <Button
                                  fullWidth
                                  startIcon={<AddIcon />}
                                  size={isMobile ? 'small' : 'medium'}
                                  sx={{
                                    color: '#fff',
                                    mt: 1,
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    '&:hover': {
                                      bgcolor: 'rgba(255,255,255,0.1)',
                                    },
                                  }}
                                  onClick={() => {
                                    setCurrentListId(column._id);
                                    setOpenCardDialog(true);
                                  }}
                                >
                                  Add a card
                                </Button>
                              </Box>
                            )}
                          </Droppable>
                        </CardContent>
                      </Card>
                    </Box>
                  )}
                </Draggable>
              ))}
              {boardProv.placeholder}
              <Box
                sx={{
                  minWidth: getColumnWidth(),
                  maxWidth: getColumnWidth(),
                  flexShrink: 0,
                }}
              >
                <Card
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    border: '2px dashed rgba(255,255,255,0.3)',
                  }}
                >
                  <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                    <Button
                      startIcon={<AddIcon />}
                      fullWidth
                      size={isMobile ? 'small' : 'medium'}
                      sx={{
                        color: '#fff',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.1)',
                        },
                      }}
                      onClick={() => setOpenListDialog(true)}
                    >
                      Add another list
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add List Dialog */}
      <Dialog
        open={openListDialog}
        onClose={() => setOpenListDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            mx: { xs: 2, sm: 3 },
            my: { xs: 2, sm: 4 },
            maxHeight: { xs: '90vh', sm: '80vh' },
          },
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          Add List
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            margin="dense"
            label="Title"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            size={isMobile ? 'small' : 'medium'}
          />
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1, sm: 2 } }}>
          <Button
            onClick={() => setOpenListDialog(false)}
            size={isMobile ? 'small' : 'medium'}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleAddList}
            size={isMobile ? 'small' : 'medium'}
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Card Dialog */}
      <Dialog
        open={openCardDialog}
        onClose={() => setOpenCardDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            mx: { xs: 2, sm: 3 },
            my: { xs: 2, sm: 4 },
            maxHeight: { xs: '90vh', sm: '80vh' },
          },
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          Add Card
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Title"
            margin="dense"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            size={isMobile ? 'small' : 'medium'}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            minRows={3}
            maxRows={6}
            margin="dense"
            value={newCardDesc}
            onChange={(e) => setNewCardDesc(e.target.value)}
            size={isMobile ? 'small' : 'medium'}
          />
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1, sm: 2 } }}>
          <Button
            onClick={() => setOpenCardDialog(false)}
            size={isMobile ? 'small' : 'medium'}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleAddCard}
            size={isMobile ? 'small' : 'medium'}
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update List Dialog */}
      <Dialog
        open={openUpdateListDialog}
        onClose={() => setOpenUpdateListDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            mx: { xs: 2, sm: 3 },
            my: { xs: 2, sm: 4 },
            maxHeight: { xs: '90vh', sm: '80vh' },
          },
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          Update List
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Title"
            margin="dense"
            value={updateListTitle}
            onChange={(e) => setUpdateListTitle(e.target.value)}
            size={isMobile ? 'small' : 'medium'}
          />
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1, sm: 2 } }}>
          <Button
            onClick={() => setOpenUpdateListDialog(false)}
            size={isMobile ? 'small' : 'medium'}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleUpdateList}
            size={isMobile ? 'small' : 'medium'}
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Card Dialog */}
      <Dialog
        open={openUpdateCardDialog}
        onClose={() => setOpenUpdateCardDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            mx: { xs: 2, sm: 3 },
            my: { xs: 2, sm: 4 },
            maxHeight: { xs: '90vh', sm: '80vh' },
          },
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          Update Card
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Title"
            margin="dense"
            value={updateCardTitle}
            onChange={(e) => setUpdateCardTitle(e.target.value)}
            size={isMobile ? 'small' : 'medium'}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            minRows={3}
            maxRows={6}
            margin="dense"
            value={updateCardDesc}
            onChange={(e) => setUpdateCardDesc(e.target.value)}
            size={isMobile ? 'small' : 'medium'}
          />
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1, sm: 2 } }}>
          <Button
            onClick={() => setOpenUpdateCardDialog(false)}
            size={isMobile ? 'small' : 'medium'}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleUpdateCard}
            size={isMobile ? 'small' : 'medium'}
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TrelloBoard;
