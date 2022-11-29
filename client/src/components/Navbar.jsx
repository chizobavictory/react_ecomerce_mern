import React from 'react'
import { Badge } from "@material-ui/core";
import styled from 'styled-components'
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { mobile } from "../responsive";
import MenuIcon from '@mui/icons-material/Menu';


const Container = styled.div`
height:60px;
`
const Wrapper = styled.div`
padding: 10px 20px;
display: flex;
justify-content: space-between;
align-items: center
`


const Left = styled.div`
flex: 1;
  display: flex;
  align-items: center;
  
`

const Language = styled.span`
font-size: 14px;
cursor: pointer;
${mobile({ display: "none" })}
`

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ display: "none" })}
`;

const Input = styled.input`
  border: none;
`;


const Center = styled.div`
flex:1;
text-align: center;
`

const Logo = styled.h1`
font-weight: bold;
`
const MobileMenu = styled.div`
  display:"none"
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ display: "none" })}
`;



function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>ANIFARM.</Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem>
            <Badge badgeContent={3} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          <MobileMenu>
            <MenuIcon />
          </MobileMenu>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar