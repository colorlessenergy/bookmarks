import Link from 'next/link';
import Image from 'next/image';
import gearIcon from '../../public/icons/gear.svg';

export default function Nav ({ showHomeLink=false }) {
    return (
        <nav className={`flex align-items-center ${ showHomeLink ? ("justify-content-between") : ("justify-content-end") }`}>
            { showHomeLink ? (
                <Link href="/">
                    <a>
                        home
                    </a>
                </Link>
            ) : (null) }

            <Link href="/settings">
                <a>
                    <Image
                        src={ gearIcon }
                        alt="gear icon"
                        width={ 50 }
                        height={ 50 }
                        title="gear icon" />
                </a>
            </Link>
        </nav>
    );
}