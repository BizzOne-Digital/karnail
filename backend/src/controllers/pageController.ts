import { Response } from 'express';
import { Page } from '../models';
import { asyncHandler, sendSuccess, AppError } from '../utils/apiResponse';
import { AuthRequest } from '../middleware/auth';

export const getAllPages = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const pages = await Page.find().select('pageKey title slug isPublished updatedAt').sort('pageKey');
  sendSuccess(res, pages);
});

export const getPageByKey = asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = await Page.findOne({ pageKey: req.params.pageKey });
  if (!page) {
    throw new AppError('Page not found', 404);
  }
  sendSuccess(res, page);
});

export const getPublicPage = asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = await Page.findOne({ pageKey: req.params.pageKey, isPublished: true });
  if (!page) {
    throw new AppError('Page not found', 404);
  }
  sendSuccess(res, page);
});

export const updatePage = asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = await Page.findOneAndUpdate(
    { pageKey: req.params.pageKey },
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!page) {
    throw new AppError('Page not found', 404);
  }
  sendSuccess(res, page);
});

export const updatePageSection = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { sectionKey } = req.params;
  const page = await Page.findOne({ pageKey: req.params.pageKey });
  if (!page) {
    throw new AppError('Page not found', 404);
  }

  const sectionIndex = page.sections.findIndex((s) => s.sectionKey === sectionKey);
  if (sectionIndex === -1) {
    throw new AppError('Section not found', 404);
  }

  page.sections[sectionIndex] = { ...page.sections[sectionIndex], ...req.body };
  await page.save();
  sendSuccess(res, page);
});

export const reorderSections = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { sectionOrder } = req.body as { sectionOrder: string[] };
  const page = await Page.findOne({ pageKey: req.params.pageKey });
  if (!page) {
    throw new AppError('Page not found', 404);
  }

  const reordered = sectionOrder
    .map((key, index) => {
      const section = page.sections.find((s) => s.sectionKey === key);
      if (section) {
        section.order = index;
        return section;
      }
      return null;
    })
    .filter(Boolean);

  page.sections = reordered as typeof page.sections;
  await page.save();
  sendSuccess(res, page);
});
