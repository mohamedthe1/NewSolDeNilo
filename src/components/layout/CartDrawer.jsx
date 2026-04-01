"use client"
import { Drawer, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // ✅ أيقونة إغلاق
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Image from "next/image";
import { useCartContext } from "@/context/CartContext";
import { useTheme } from "@mui/material/styles";
import { Delete } from "@mui/icons-material";

const CartDrawer = ({ open, onClose,onCheckout }) => {
  const { cartItems, removeFromCart, clearCart, total} = useCartContext();
  const muiTheme = useTheme();



  const handleCheckout = () => {
    alert(`✅ Checkout successful! Total: $${total.toFixed(2)}`);
    clearCart();
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 380,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: muiTheme.palette.background.default,
        }}
      >
        {/* ✅ العنوان + زر الإغلاق */}
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${muiTheme.palette.divider}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight="700" color="primary">
            🛒 Your Trips Cart
          </Typography>

          {/* ✅ زر إغلاق السلة */}
          <IconButton
            onClick={onClose}
            sx={{
              color: muiTheme.palette.error.main,
              "&:hover": {
                backgroundColor: muiTheme.palette.error.light,
                color: "#fff",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* ✅ قائمة الرحلات */}
        <Box sx={{ flex: 1, px: 3, py: 2, overflowY: "auto" }}>
          {cartItems.length === 0 ? (
            <Typography color="text.secondary">No trips added yet.</Typography>
          ) : (
            cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                  p: 1.5,
                  borderRadius: "12px",
                  boxShadow: muiTheme.shadows[3],
                  backgroundColor: muiTheme.palette.background.paper,
                }}
              >
                {item.image?.url && (
                  <Image
                    src={item.image.url}
                    alt={item.image.label || item.title}
                    width={80}
                    height={80}
                    style={{ borderRadius: "10px", objectFit: "cover" }}
                  />
                )}

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    color="text.primary"
                  >
                    {item.title}{" "}
                    <span style={{ color: muiTheme.palette.text.secondary }}>
                      ×{item.quantity}
                    </span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.price} each
                  </Typography>
                </Box>

                <IconButton
                  color="error"
                  onClick={() => removeFromCart(item.id)}
                  sx={{
                    "&:hover": {
                      backgroundColor: muiTheme.palette.error.light,
                    },
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            ))
          )}
        </Box>

        {/* ✅ التوتل + زر الشراء */}
        <Box
          sx={{
            borderTop: `1px solid ${muiTheme.palette.divider}`,
            p: 3,
            backgroundColor: muiTheme.palette.background.paper,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography
              variant="subtitle1"
              fontWeight="600"
              color="text.primary"
            >
              Total:
            </Typography>
            <Typography variant="h6" fontWeight="700" color="primary">
              ${total.toFixed(2)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            disabled={cartItems.length === 0}
            onClick={onCheckout}
            startIcon={<ShoppingCartCheckoutIcon />}
            sx={{
              fontWeight: "700",
              borderRadius: "10px",
              py: 1.5,
              backgroundColor: muiTheme.palette.secondary.main,
              color: muiTheme.palette.getContrastText(
                muiTheme.palette.secondary.main
              ),
              "&:hover": {
                backgroundColor: muiTheme.palette.primary.main,
                color: muiTheme.palette.getContrastText(
                  muiTheme.palette.primary.main
                ),
              },
            }}
          >
            {" "}
            Checkout{" "}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
