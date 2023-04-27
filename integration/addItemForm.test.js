describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:6006/iframe.html?args=&id=todolists-additemform--add-item-form-with-error-story&viewMode=story');
        const image = await page.screenshot();
        await page.waitForTimeout(3000)

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});