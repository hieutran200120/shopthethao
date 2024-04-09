import styled from 'styled-components';
export const MoviesRowContainer = styled.div`
    background-color: var(--color-background);
    color: var(--color-white);
    padding: 20px 20px 0;
    position:relative;
    width: 100%;
    height: 100%;
    .btnLeft{
        position:absolute;
        top:50%;
        left:30px;
        z-index:20;
        transform-origin:center;
        current:pointer;
        background-color:rgba(0,0,0,0.5);
        height:100px;
        width:50px;
        border-radius:4px;
        display:flex;
        align-items:center;
        transform:translateY(-20%);
    }
    .btnRight{
        position:absolute;
        top:50%;
        right:30px;
        z-index:20;
        transform-origin:center;
        current:pointer;
        background-color:rgba(0,0,0,0.5);
        height:100px;
        width:50px;
        border-radius:4px;
        display:flex;
        align-items:center;
        transform:translateY(-20%);
    }
`;
export const MoviesSlider = styled.div`
display: grid;
grid-template-columns:repeat(${props => props.productBoy.Length},243px);
gap: 6px;
transition: all 0.3s linear;
user-select: none;
overflow-y: hidden;
overflow-x: auto;
overflow:hidden;
padding-top: 28px;
padding-bottom: 28px;
scroll-behavior: smooth;

.movieItem {
    transform: scale(1);
    max-width: 228px;
    max-height: 414px;
    width: 100%;
    height: 100%;
    transition: all 0.3s linear;
    user-select: none;
    overflow: hidden;
    transform:center left;
    position: relative;
}
`;
