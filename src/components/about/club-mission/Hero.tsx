import { HeroCardSection } from './HeroCardSection'
import { AboutTitle } from '../AboutTitle'
import { Title } from '@/components/Common/Title'
import MaxWidthWrapper from '@/components/Common/MaxWidthWrapper'

const data = {
    title: "Our Mission",
    desc: "To foster global diplomatic relations and enhance international cooperation by providing a dynamic platform where ambassadors, dignitaries, and policy leaders can convene to discuss and collaborate on global peace, security, development, and address global challenges. The Ambassadors' Club is committed to supporting the professional growth of its members and amplifying their impact in global diplomacy and humanitarian efforts. ",
    image: "/about/club-mission.jpg"

}

export const Hero = () => {
    return (
        <div className='bg-surface-main-bg pt-[3rem] pb-[11.375rem] ' >
            <MaxWidthWrapper>
                <div>

                    <AboutTitle text={"Mission, Vision and Values Of The Club"} />
                    <HeroCardSection data={data} />
                </div>
            </MaxWidthWrapper>
        </div>
    )
}
