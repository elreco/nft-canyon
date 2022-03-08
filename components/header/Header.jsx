import React , { useRef , useState , useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router'
import menus from "./menu";
import logodark2x from '../../public/images/logo/logo_dark@2x.png'
import logodark from '../../public/images/logo/logo_dark.png'
import imgsun from '../../public/images/icon/sun.png'
import avt from '../../public/images/avatar/avt-2.jpg';
import Image from 'next/image';

const Header = () => {
    const router = useRouter()
    const pathname = router.pathname

    const headerRef = useRef (null)
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    const isSticky = (e) => {
        const header = document.querySelector('.js-header');
        const scrollTop = window.scrollY;
        scrollTop >= 300 ? header.classList.add('is-fixed') : header.classList.remove('is-fixed');
        scrollTop >= 400 ? header.classList.add('is-small') : header.classList.remove('is-small');
    };

    const menuLeft = useRef(null)
    const btnToggle = useRef(null)
    const btnSearch = useRef(null)

    const menuToggle = () => {
        menuLeft.current.classList.toggle('active');
        btnToggle.current.classList.toggle('active');
    }

    const searchBtn = () => {
        btnSearch.current.classList.toggle('active');
    }

    const [activeIndex, setActiveIndex] = useState(null);
    const handleOnClick = index => {
        setActiveIndex(index); 
    };

    return (
        <header id="header_main" className="header_1 js-header" ref={headerRef}>
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">                              
                        <div id="site-header-inner"> 
                            <div className="wrap-box flex">
                                <div id="site-logo" className="clearfix">
                                    <div id="site-logo-inner">
                                        <Link href="/">
                                            <a rel="home" className="main-logo">
                                                <Image className='logo-dark' id="logo_header" src={logodark} srcSet={`${logodark2x}`} alt="nft canyon" />
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                                <div className="mobile-button" ref={btnToggle} onClick={menuToggle}><span></span></div>
                                <nav id="main-nav" className="main-nav" ref={menuLeft} >
                                    <ul id="menu-primary-menu" className="menu">
                                        {
                                            menus.map((data,index) => (
                                                <li key={index} onClick={()=> handleOnClick(index)} className={`menu-item ${data.namesub ? 'menu-item-has-children' : '' } ${activeIndex === index ? 'active' : ''} ` }   >
                                                    <a href={data.links}>{data.name}</a>
                                                    {
                                                         data.namesub &&
                                                         <ul className="sub-menu" >
                                                            {
                                                                data.namesub.map((submenu) => (
                                                                    <li key={submenu.id} className={
                                                                        pathname === submenu.links
                                                                        ? "menu-item current-item"
                                                                        : "menu-item"
                                                                    }><a to={submenu.links}>{submenu.sub}</a></li>
                                                                ))
                                                            }
                                                        </ul>
                                                    }
                                                    
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                                <div className="flat-search-btn flex">
                                    <div className="header-search flat-show-search" id="s1">
                                        <a href="#" className="show-search header-search-trigger" onClick={searchBtn}>
                                            <i className="far fa-search"></i>
                                        </a>
                                        <div className="top-search" ref={btnSearch}>
                                            <form action="#" method="get" role="search" className="search-form">
                                                <input type="search" id="s" className="search-field" placeholder="Search..." name="s" title="Search for" required="" />
                                                <button className="search search-submit" type="submit" title="Search">
                                                    <i className="icon-fl-search-filled"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="sc-btn-top mg-r-12" id="site-header">
                                        <a href="/wallet-connect" className="sc-button header-slider style style-1 wallet fl-button pri-1"><span>Wallet connect
                                        </span></a>
                                    </div>

                                    <div className="admin_active" id="header_admin">
                                        <div className="header_avatar">
                                            <div className="price">
                                                <span>2.45 <strong>ETH</strong> </span>
                                            </div>
                                            <Image
                                                className="avatar"
                                                src={avt}
                                                alt="avatar"
                                            />
                                            <div className="avatar_popup mt-20">
                                                <div className="d-flex align-items-center copy-text justify-content-between">
                                                    <span> 13b9ebda035r178... </span>
                                                    <a href="#" className="ml-2">
                                                        <i className="fal fa-copy"></i>
                                                    </a>
                                                </div>
                                                <div className="d-flex align-items-center mt-10">
                                                    <Image
                                                        className="coin"
                                                        src={imgsun}
                                                        alt="/"
                                                        />
                                                    <div className="info ml-10">
                                                        <p className="text-sm font-book text-gray-400">Balance</p>
                                                        <p className="w-full text-sm font-bold text-green-500">16.58 ETH</p>
                                                    </div>
                                                </div>
                                                <div className="hr"></div>
                                                <div className="links mt-20">
                                                    <a>
                                                        <i className="fab fa-accusoft"></i> <span> My items</span>
                                                    </a>
                                                    <a className="mt-10" href="/edit-profile">
                                                        <i className="fas fa-pencil-alt"></i> <span> Edit Profile</span>
                                                    </a>
                                                    <a className="mt-10" href="/login" id="logout">
                                                        <i className="fal fa-sign-out"></i> <span> Logout</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
