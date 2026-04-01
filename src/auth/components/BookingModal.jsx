// import { useCart } from "@/context/CartContext";
// import { Box, Modal, Typography, Divider, Button } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import Image from "next/image";

// const BookingModal = ({ open, setOpen,}) => {
//   const muiTheme = useTheme();
//   const { cartItems, removeFromCart, clearCart ,total} = useCart();

//   return (
//     <Modal open={open} onClose={() => setOpen(false)}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)", // ✅ في منتصف الصفحة
//           backgroundColor: muiTheme.palette.background.paper,
//           borderRadius: "16px",
//           boxShadow: muiTheme.shadows[6],
//           p: { xs: 2, sm: 3, md: 4 },
//           maxWidth: { xs: "95vw", sm: "90vw", md: 720 },
//           width: "100%",
//           maxHeight: "90vh",
//           overflowY: "auto",
//           fontFamily: "Cairo, sans-serif",
//         }}
//       >
//         {/* ✅ العنوان */}
//         <Typography
//           variant="h5"
//           fontWeight="700"
//           sx={{ color: muiTheme.palette.primary.main, mb: 3, textAlign: "center" }}
//         >
//           🧾 Booking Summary
//         </Typography>

//         {/* ✅ قائمة الرحلات */}
//         {cartItems.length === 0 ? (
//           <Typography color="text.secondary" textAlign="center">
//             No trips selected.
//           </Typography>
//         ) : (
//           cartItems.map((item) => (
//             <Box
//               key={item.id}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//                 mb: 2,
//                 p: 2,
//                 borderRadius: "12px",
//                 boxShadow: muiTheme.shadows[2],
//                 backgroundColor: muiTheme.palette.background.default,
//               }}
//             >
//               {/* ✅ صورة الرحلة */}
//               {item.image?.url && (
//                 <Image
//                   src={item.image.url}
//                   alt={item.image.label || item.title}
//                   width={80}
//                   height={80}
//                   style={{ borderRadius: "10px", objectFit: "cover" }}
//                 />
//               )}

//               {/* ✅ تفاصيل الرحلة */}
//               <Box sx={{ flex: 1 }}>
//                 <Typography variant="subtitle1" fontWeight="600" color="text.primary">
//                   {item.title} <span style={{ color: muiTheme.palette.text.secondary }}>×{item.quantity}</span>
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   ${item.price} each
//                 </Typography>
//                 {item.date && (
//                   <Typography variant="body2" color="text.secondary">
//                     📅 {item.date}
//                   </Typography>
//                 )}
//               </Box>
//             </Box>
//           ))
//         )}

//         <Divider sx={{ my: 2 }} />

//         {/* ✅ التوتل */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <Typography variant="subtitle1" fontWeight="600" color="text.primary">
//             Total:
//           </Typography>
//           <Typography variant="h6" fontWeight="700" color="primary">
//             ${total.toFixed(2)}
//           </Typography>
//         </Box>

//         {/* ✅ زر التأكيد */}
//         <Button
//           variant="contained"
//           fullWidth
//           // onClick={handleConfirm}
//           sx={{
//             mt: 2,
//             fontWeight: "700",
//             borderRadius: "10px",
//             py: 1.5,
//             backgroundColor: muiTheme.palette.secondary.main,
//             color: muiTheme.palette.getContrastText(muiTheme.palette.secondary.main),
//             "&:hover": {
//               backgroundColor: muiTheme.palette.primary.main,
//               color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main),
//             },
//           }}
//         >
//           Confirm Booking ✅
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default BookingModal;
