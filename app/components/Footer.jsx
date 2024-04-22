
import Image from "next/legacy/image";


const FooterLinks = ({ heading, items }) => (
	<div className='flex-1 justify-start items-start'>
		<h3 className='font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-5'>
			{heading}
		</h3>
		{items.map((item, index) => (
			<p
				key={index}
				className='font-poppins  dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3'>
				{item}
			</p>
		))}
	</div>
);
const Footer = () => {
	return (
		<footer className='flexCenter  flex-col border-t dark:border-nft-black-1 dark:bg-nft-dark border-nft-gray-1 sm:py-3 py-5'>
			<div className='w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16'>
				<div className='flexStart  flex-col sm:hidden'>
					<div className='flex flex-col items-start sm:mt-4 cursor-pointer sm:hidden'>
						<Image
							src='/logo.webp'
							objectFit='contain'
							width={50}
							height={50}
							alt='logo'
						/>
            <p className='font-poppins pt-5 dark:text-white text-nft-black-1 text-md font-semibold'>
						@Validify, INC All Rights Reserved
					</p>
					</div>
				</div>
				<div className='flexCenterStart flex-1  md:ml-0'>
        <div className="flex sm:gap-10 gap-32">
        <FooterLinks
						heading='Project Guide'
						items={["Prof . Kishor Shivathaya"]}
					/>
					<FooterLinks
						heading='Contributers'
						items={[
							"Shrivatsa",
							"Satwik Sadashay V",
							"Shashank S",
							"Shreyas S",
						]}
					/>
          </div>
          
				</div>
			</div>
			{/* <div className="flex flex-row sm:mt-4">
            {['/instagram.png', '/twitter.png', '/telegram.png', '/discord.png'].map((image, index) => (
              <div className="mx-2 cursor-pointer" key={index}>
                <Image src={image} objectFit="contain" width={24} height={24} alt="social" className={theme === 'light' ? 'filter invert' : undefined} />
              </div>
            ))}
          </div> */}
		</footer>
	);
};

export default Footer;
