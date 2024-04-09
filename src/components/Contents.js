import React, { useRef } from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ArrowRightOutlined } from '@ant-design/icons';
import { smoothHorizontalScrolling } from './scroll';
const movies = [
    "https://image.phunuonline.com.vn/fckeditor/upload/2023/20230919/images/tac-gia-thiet-ke-poster-phim-_161695124133.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-uFqnLUszA3ZJF-43fs8ZgoWQjMeoLqRxmu8HZ4CXN1tU5h4XjCNe4NhpMZf6kd9bMmw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY5-z-2i18PbU_faaI6zOWuVOAfH4_fySoXEzMCMnq20YNY2c5CODq9EkYvzSGI1rRpGY&usqp=CAU",
    "https://huenews.net/wp-content/uploads/2019/12/chinh-anh-mat-biec-04.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaR9cWZeuavdSyKYdyk-SIpF9Z8_9XOI4IePgFsv7hsoMf8mEu50M9HmqAfdlUveS29e8&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgU1PULkVO7OcB4tLhyhMfUT52IXOGYDVNDw&usqp=CAU",
    "https://arena.fpt.edu.vn/wp-content/uploads/2021/04/5-yeu-to-tao-nen-mot-poster-phim-an-tuong.jpeg",
    "https://vb.1cdn.vn/2022/12/03/nbn_teaser-poster_fb.jpg"
];

const Contents = () => {
    return (
        <MoviesRowContainer>
            <MoviesSlider ref={sliderRef}>
                {movies.map((movie, index) => (
                    <div key={index} className="movieItem" ref={movieRef}>
                        <img src={movie} alt={`Movie ${index}`} />
                    </div>
                ))}
            </MoviesSlider>
        </MoviesRowContainer>
    );
};

export default Contents;
const MoviesRowContainer = styled.div`
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

const MoviesSlider = styled.div`
    display: grid;
    grid-template-columns:repeat(${movies.length},300px);
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
        max-width: 400px;
        max-height: 400px;
        width: 100%;
        height: 100%;
        transition: all 0.3s linear;
        user-select: none;
        overflow: hidden;
        transform:center left;
        position: relative;
    }
`;